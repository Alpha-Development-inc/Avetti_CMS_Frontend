import { Box, Button, Paper,Dialog,DialogActions } from '@material-ui/core';
import React, { useState, useEffect, Component, useContext } from 'react';
import ReactDOM from 'react-dom'
import CreateComponentDialog from './CreateComponentDialog'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';
import { RowProvider } from '../contexts/RowContext';
import ContentComponent from './ContentComponent';
import PageContext from '../contexts/PageContext';
import CreateTextContent from './CreateTextContent';
import { ComponentProvider } from '../contexts/ComponentContext';
import CreateImageContent from './CreateImageContent';

const Row =(props)=>{

    const [rowComponents,setRowComponents] = useState(props.rowComponents);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('default');
    const pageId = useContext(PageContext);

    const DELETE_ROW = gql`
        mutation DeleteRow($rowIndex: Int!, $pageId: String!) {
            deleteRow(rowIndex: $rowIndex, pageId: $pageId){
                id
                title
                contentRows{
                    contentComponents{
                        type
                        content
                    }
                }
            }
        }
    `;

    const [deleteRow, { data, error, loading }] = useMutation(DELETE_ROW);

    const handleDelete = () => {
        console.log(props.rowIndex);
        deleteRow({variables: { rowIndex: props.rowIndex, pageId: pageId}});
    }

    useEffect(() => {

        if (!loading && data){
            console.log("row deleted...")
            console.log(data);
        }
        
    }, [data, loading]);

    const handleOpenDialog=()=>{
        setOpen(true);
    }
    const handleCloseDialog=()=>{
        setOpen(false);
    }
    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
        console.log(status);
    }
    const handleDeleteComponent = (index) => {
        setRowComponents(rowComponents.filter((c, i) => (i != index)));
    }

    return(

        <RowProvider value={props.rowIndex}>
            <Box height="300px" border={2} borderColor="primary.main" borderRadius="10px" marginTop="5px">
                <Paper elevation={3}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <Button color="primary" onClick={handleOpenDialog} 
                            disabled={props.rowComponents.length >= 2 || status !== 'default'} startIcon={<AddIcon/>}>
                                 Add Component
                        </Button>
                        <Dialog
                            open={open} 
                            onClose={handleCloseDialog}
                            aria-labelledby="createcomponentdialog"
                            fullWidth
                            maxWidth="sm">
                            <CreateComponentDialog handleClose={handleCloseDialog} handleChangeStatus={handleChangeStatus}/>
                        </Dialog>
                        <Button color="secondary" startIcon={<DeleteIcon/>} onClick={handleDelete}>Delete</Button>
                    </Box>
                </Paper>

                <Box display="flex" flexDirection="row" justifyContent="space-around" id="contentRow">
                    {rowComponents.map((c, index)=>(
                        <ComponentProvider value={index}>
                            <ContentComponent component={c} handleDelete={handleDeleteComponent}/>
                        </ComponentProvider>
                    ))}
                    {status === 'createText' &&
                        <CreateTextContent handleChangeStatus={handleChangeStatus}/>
                    }
                    {status === 'createImage' &&
                        <CreateImageContent handleChangeStatus={handleChangeStatus}/>
                    }
                </Box>

            </Box>
        </RowProvider>

        
    )
}

export default Row;