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
import RefreshContext from '../contexts/RefreshContext';

const Row =(props)=>{

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('default');
    const pageId = useContext(PageContext);
    const refresh = useContext(RefreshContext);

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
            refresh();
        }
        
    }, [data, loading]);

    const handleOpenDialog=()=>{
        setOpen(true);
    }
    const handleCloseDialog=()=>{
        setOpen(false);
    }
    const handleCloseEditor = () => {
        setStatus('default');
    }

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
        console.log(status);
    }

    return(

        <RowProvider value={props.rowIndex}>
            <Paper elevation={3}>

            
            <Box height="300px" marginTop="5px">
                <Paper elevation={3}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <Button color="primary" onClick={handleOpenDialog} 
                            disabled={props.row.contentComponents.length >= 2 || status !== 'default'} startIcon={<AddIcon/>}>
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

                <Box display="flex" flexDirection="row" justifyContent="space-around" id="contentRow" height="85%">
                    {props.row.contentComponents.map((c, index)=>(
                        <ComponentProvider value={index} key={index}>
                            <ContentComponent component={c} key={index} />
                        </ComponentProvider>
                    ))}
                    {status === 'createText' &&
                        <Box margin="5px" width="45%" height="100%" position="relative">
                            <CreateTextContent handleChangeStatus={handleChangeStatus} mode='create'
                            handleClose={handleCloseEditor}/>
                        </Box>
                    }
                    {status === 'createImage' &&
                        <Box margin="5px" width="45%" height="100%" position="relative">
                            <CreateImageContent handleChangeStatus={handleChangeStatus}/>
                        </Box>
                    }
                </Box>

            </Box>
            </Paper>
        </RowProvider>

        
    )
}

export default Row;