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

    const [status, setStatus] = useState('default');
    const [showMenu, setShowMenu] = useState(false);


const handleDelete = () => {
    props.handleDelete();
}
    const handleUpdate=()=>{
        return(
            <CreateTextContent />
        )
    }

    const handleEditText = () => {
        setStatus('editText');
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
            <Paper className="paper-fullsize">
                <Box position="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                margin="auto" height="95%" widht="95%" paddingTop="15px">
                    {status === 'showMenu' && 
                        <Box className="popup-menu">
                            <Button variant="contained" onClick={handleEditText}>Edit</Button>
                            <Button variant="contained" onClick={handleDelete}>Delete</Button>
                        </Box> 
                    }
                    {status === 'editText' && 
                    
                        <CreateTextContent mode="edit" content={props.content} handleChangeStatus={handleChangeStatus}/>
                        
                    }

                    {status !== 'editText' && 
                        <div className="text-content" dangerouslySetInnerHTML={createMarkup(props.content)}></div> 
                    }
                    
                </Box>
            </Paper>      
        
      
      )
}
export default TextComponent;