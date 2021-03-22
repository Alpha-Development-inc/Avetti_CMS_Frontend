import { Box, Button, Paper,Dialog,DialogActions, Card, CardHeader, IconButton, CardContent, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect, createRef, useContext } from 'react';
import ReactDOM from 'react-dom'
import CreateComponentDialog from './CreateComponentDialog'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';
import { RowProvider } from '../contexts/RowContext';
import { IKImage } from 'imagekitio-react';
import { MoreVert, ZoomIn, ZoomOut } from '@material-ui/icons';
import ComponentContext from '../contexts/ComponentContext';
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';

const ImageComponent =(props)=>{

    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState('default');
    const [showMenu, setShowMenu] = useState(false);
    const [width, setWidth] = useState(0);

    const imgRef = createRef();

    const handleImageLoad = () => {
        console.log(imgRef.current.naturalWidth);
        setWidth(imgRef.current.naturalWidth);
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleEditImage = () => {
        setStatus('editImage');
        setAnchorEl(null);
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const increaseScale = () => {
        if (width < 250){
            setWidth(width + 10);
            console.log(width);
        }
    }

    const decreaseScale = () => {
        if (width > 150){
            setWidth(width - 10);
            console.log(width);
        }
    }

    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext);
    const componentIndex = useContext(ComponentContext); 

    const RESIZE_COMPONENT = gql`
        mutation ResizeImageComponent($newWidth: Int!, $componentIndex: Int! $rowIndex: Int!, $pageId: String!) {
            resizeImageComponent(newWidth: $newWidth, componentIndex: $componentIndex, rowIndex: $rowIndex, pageId: $pageId)
        }
    `;

    const [resizeComponent, { data, error, loading }] = useMutation(RESIZE_COMPONENT);

    const handleResize = () => {
        resizeComponent({variables: { newWidth: width, componentIndex: componentIndex, rowIndex: rowIndex, pageId: pageId}});
        setStatus('default');
    }

    const DELETE_COMPONENT = gql`
        mutation DeleteComponent($componentIndex: Int!, $rowIndex: Int!, $pageId: String!) {
            deleteComponent(componentIndex: $componentIndex, rowIndex: $rowIndex, pageId: $pageId){
                title
                contentComponents{
                    type
                    content
                }
            }
        }
    `;

    const [deleteComponent, { data: deleteData, error: deleteError, loading: deleteLoading }] = useMutation(DELETE_COMPONENT);

    const handleDelete = () => {
        deleteComponent({variables: { componentIndex: componentIndex, rowIndex: rowIndex, pageId: pageId}});
        setAnchorEl(null);
        props.handleDelete(componentIndex);
    }

    const handleMouseEnter = () => {
        if (status === 'default'){
            setStatus('showMenu');
        }
    }

    const handleMouseLeave = () => {
        if (status === 'showMenu'){
            setStatus('default');
        }
    }

    useEffect(() => {

        if (!loading && data){
            console.log("row deleted...")
            console.log(data);
        }
        
    }, [data, loading]);

    return(

        <Paper>
            <Box position="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} margin="auto">

                
                {status === 'showMenu' && 
                    <Box className="popup-menu">
                        <Button variant="contained" onClick={handleEditImage}>Resize</Button>
                        <Button variant="contained" onClick={handleDelete}>Delete</Button>
                    </Box> 
                }

                {status === 'editImage' &&
                    <Box className="popup-menu">
                        <Button variant="contained" startIcon={<ZoomIn/>} onClick={increaseScale}
                        disabled={width >= 250}>Increase</Button>
                        <Button variant="contained" startIcon={<ZoomOut/>} onClick={decreaseScale}
                        disabled={width <= 150}>Decrease</Button>
                        <Button size="small" variant="contained" color="primary" onClick={handleResize}>Save</Button>
                    </Box> 
                }
            {/* <IKImage path={props.content} ref={imgRef} width={width != 0 ? width : null}/> */}
            <img alt="image" src={props.content} ref={imgRef} width={width} onLoad={handleImageLoad}/>
            </Box>
        </Paper>                    
    )
}

export default ImageComponent;