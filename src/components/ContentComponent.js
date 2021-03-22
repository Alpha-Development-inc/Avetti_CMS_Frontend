import { Box, Button, Paper,Dialog,DialogActions, Card, CardHeader, IconButton, CardContent, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import CreateComponentDialog from './CreateComponentDialog'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';
import { RowProvider } from '../contexts/RowContext';
import { IKImage } from 'imagekitio-react';
import DOMPurify from 'dompurify';
import { MoreVert, ZoomIn, ZoomOut } from '@material-ui/icons';
import ImageComponent from './ImageComponent';

const ContentComponent =(props)=>{

    const [rowComponents,setRowComponents]=useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState('default');

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


    //------------------TO BE IMPLEMENTED--------------------
    // const DELETE_COMPONENT = gql`
    //     mutation DeleteComponent($rowIndex: Int!, $pageId: String!) {
    //         deleteComponent(rowIndex: $rowIndex, pageId: $pageId){
    //             id
    //             title
    //             contentRows{
    //                 contentComponents{
    //                     text
    //                 }
    //             }
    //         }
    //     }
    // `;

    // const [deleteComponent, { data, error, loading }] = useMutation(DELETE_COMPONENT);

    // const handleDelete = () => {
    //     console.log(props.rowIndex);
    //     deleteRow({variables: { rowIndex: props.rowIndex, pageId: props.pageId}});
    // }

    // useEffect(() => {

    //     if (!loading && data){
    //         console.log("row deleted...")
    //         console.log(data);
    //     }
        
    // }, [data, loading]);

    // const handleOpenDialog=()=>{
    //     setOpen(true);
    // }
    // const handleCloseDialog=()=>{
    //     setOpen(false);
    // }

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }

    return(

            <Box margin="5px">

                

                {props.component.type === 'image' &&
                    
                    <ImageComponent content={props.component.content} handleDelete={props.handleDelete}/>

                }



                <Paper elevation={3}>
                    <Box>
                        
                        {props.component.type === 'text' &&
                            <div dangerouslySetInnerHTML={createMarkup(props.component.content)}></div>   
                        }
                    </Box>
                </Paper>
            </Box>

        
    )
}

export default ContentComponent;