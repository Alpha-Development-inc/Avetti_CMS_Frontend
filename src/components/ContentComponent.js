import { Box, Button, Paper,Dialog,DialogActions, Card, CardHeader, IconButton, CardContent, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
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
import TextComponent from './TextComponent';
import ComponentContext from '../contexts/ComponentContext';
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";

const ContentComponent =(props)=>{

    const [rowComponents,setRowComponents]=useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState('default');

    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext);
    const componentIndex = useContext(ComponentContext); 

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

    const [deleteComponent, { data, error, loading }] = useMutation(DELETE_COMPONENT);

    const handleDelete = () => {
      deleteComponent({variables: { componentIndex: componentIndex, rowIndex: rowIndex, pageId: pageId}});
      props.handleDelete(componentIndex);
    }



    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }

    return(

            <Box margin="5px" width="45%" height="100%">

                

                {props.component.type === 'image' &&
                    
                    <ImageComponent content={props.component.content} handleDelete={handleDelete}/>

                }


                {props.component.type === 'text' &&
                    <TextComponent content={props.component.content} handleDelete={handleDelete}/> 
                }

            </Box>

        
    )
}

export default ContentComponent;