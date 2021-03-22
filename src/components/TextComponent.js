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
import DOMPurify from 'dompurify';
import CreateTextContent from './CreateTextContent';



const TextComponent=(props)=>{
    //const [status, setStatus] = useState('default');
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState('default');
    const [showMenu, setShowMenu] = useState(false);


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
    const handleUpdate=()=>{
        return(
            <CreateTextContent />
        )
    }

    const handleEditText = () => {
        setStatus('editText');
        setAnchorEl(null);
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

  

    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext);
    const componentIndex = useContext(ComponentContext); 


    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }
      const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
        console.log(status);
    }
      return(
        <Paper>
        <Box position="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} margin="auto">

            
            {status === 'showMenu' && 
                <Box className="popup-menu">
                    <Button variant="contained" onClick={handleEditText}>Update</Button>
                    <Button variant="contained" onClick={handleDelete}>Delete</Button>
                </Box> 
            }
             {status === 'editText' && 
               
                    <CreateTextContent handleChangeStatus={handleChangeStatus}/>
                
            }

            
            <div dangerouslySetInnerHTML={createMarkup(props.content)}></div> 
        
        </Box>
    </Paper>      
      
      )
}
export default TextComponent;