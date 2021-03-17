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

    useEffect(() => {

        if (!loading && data){
            console.log("row deleted...")
            console.log(data);
        }
        
    }, [data, loading]);

    return(

        <Paper>
            <Box>
                {status === 'default' && 
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton aria-controls="setings-menu" aria-haspopup="true"
                            aria-label="settings" onClick={handleClick}>
                            <MoreVert/>
                        </IconButton>
                    </Box>
                }
                <Menu
                    id="settings-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleEditImage}>Resize</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                {status === 'editImage' &&
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <IconButton aria-label="increase size" onClick={increaseScale}
                            disabled={width >= 250}>
                                <ZoomIn/>
                            </IconButton>
                            <IconButton aria-label="decrease size" onClick={decreaseScale}
                            disabled={width <= 150}>
                                <ZoomOut/>
                            </IconButton>
                        </Box>
                        <Button size="small" color="primary" onClick={handleResize}>Save</Button> 
                    </Box> 
                }
            </Box>
            {/* <IKImage path={props.content} ref={imgRef} width={width != 0 ? width : null}/> */}
            <img alt="image" src={props.content} ref={imgRef} width={width} onLoad={handleImageLoad}/>
        </Paper>                    
    )
}

export default ImageComponent;