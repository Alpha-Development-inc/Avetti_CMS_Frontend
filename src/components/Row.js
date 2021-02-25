import { Box, Button, Paper,Dialog,DialogActions } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import CreateComponentDialog from './CreateComponentDialog'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';

const Row =(props)=>{
    const [rowComponents,setRowComponents]=useState([]);
    const [open, setOpen] = useState(false);
    function addNewComponent(){
       
    }

    const DELETE_ROW = gql`
        mutation DeleteRow($rowIndex: Int!, $pageId: String!) {
            deleteRow(rowIndex: $rowIndex, pageId: $pageId){
                id
                title
                contentRows{
                    contentComponents{
                        text
                    }
                }
            }
        }
    `;

    const [deleteRow, { data, error, loading }] = useMutation(DELETE_ROW);

    const handleDelete = () => {
        console.log(props.rowIndex);
        deleteRow({variables: { rowIndex: props.rowIndex, pageId: props.pageId}});
    }

    useEffect(() => {

        if (!loading && data){
            console.log("row deleted...")
            console.log(data);
        }
        
    }, [data, loading]);
    function addNewComponent(){
        
        
         
     }
    const handleOpenDialog=()=>{
        setOpen(true);
    }
    const handleCloseDialog=()=>{
        setOpen(false);
    }
    return(

        <Box height="33%" border={2} borderColor="primary.main" borderRadius="10px" marginTop="5px">
            <Paper elevation={3}>
                <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <Button color="primary" onClick={handleOpenDialog} startIcon={<AddIcon/>}>Add Component</Button>
                    <Dialog  open={open} onClose={handleCloseDialog} aria-labelledby="createcomponentdialog">
                        <CreateComponentDialog />
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Close  </Button>
                        </DialogActions>
                    </Dialog>
                    <Button color="secondary" startIcon={<DeleteIcon/>} onClick={handleDelete}>Delete</Button>
                </Box>
            </Paper>

            <div id='contentcomponent'>
                {props.rowComponents.map((g)=>(g.data))}
            </div>
        </Box>
        
    )
}

export default Row;