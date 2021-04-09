import { Box, Button, Paper } from '@material-ui/core';
import React, { useState, createRef, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ZoomIn, ZoomOut } from '@material-ui/icons';
import ComponentContext from '../contexts/ComponentContext';
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";

//-----------------------WRITTEN BY ALEX-----------------------------------------------------
const ImageComponent =(props)=>{

    const [status, setStatus] = useState('default');
    const [width, setWidth] = useState(0);

    const imgRef = createRef();

    const handleImageLoad = () => {
        setWidth(imgRef.current.naturalWidth);
    }

    const handleEditImage = () => {
        setStatus('editImage');
    }

    const increaseScale = () => {
        if (width < 250){
            setWidth(width + 10);
        }
    }

    const decreaseScale = () => {
        if (width > 150){
            setWidth(width - 10);
        }
    }

    const pageId = useContext(PageContext);
    const row = useContext(RowContext);
    const componentIndex = useContext(ComponentContext);

    const RESIZE_COMPONENT = gql`
        mutation ResizeImageComponent($newWidth: Int!, $componentIndex: Int! $rowIndex: Int!, $pageId: String!) {
            resizeImageComponent(newWidth: $newWidth, componentIndex: $componentIndex, rowIndex: $rowIndex, pageId: $pageId)
        }
    `;

    const [resizeComponent] = useMutation(RESIZE_COMPONENT);

    const handleResize = () => {
        resizeComponent({variables: { newWidth: width, componentIndex: componentIndex, rowIndex: row.rowIndex, pageId: pageId}});
        setStatus('default');
    }

    const handleDelete = () => {
        props.handleDelete();
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

    return(

        <Paper className="paper-fullsize">
            <Box position="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            display="flex" justifyContent="center" alignItems="center" height="100%">

                
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
            <Box>
                <img alt="content" src={props.content} ref={imgRef} width={width} onLoad={handleImageLoad}/>
            </Box>
            </Box>
        </Paper>                    
    )
}

export default ImageComponent;