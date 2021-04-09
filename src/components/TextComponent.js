import { Box, Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import CreateTextContent from './CreateTextContent';


//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const TextComponent=(props)=>{

    const [status, setStatus] = useState('default');

    const handleDelete = () => {
        props.handleDelete();
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

    const handleCloseEditor = () => {
        setStatus('default');
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
                    
                        <CreateTextContent mode="edit" content={props.content} handleChangeStatus={handleChangeStatus}
                        handleClose={handleCloseEditor}/>
                        
                    }

                    {status !== 'editText' && 
                        <div className="text-content" dangerouslySetInnerHTML={createMarkup(props.content)}></div> 
                    }
                    
                </Box>
            </Paper>      
        
      
      )
}
export default TextComponent;