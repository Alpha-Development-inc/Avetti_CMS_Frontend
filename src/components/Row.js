import { Box, Button, Paper,Dialog } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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
    const [row, setRow] = useState(props);
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
    const REORDER_COMPONENTS = gql`
        mutation ReorderComponents($source: Int!, $destination: Int!, $rowIndex: Int!, $pageId: String!) {
            reorderComponents(source: $source, destination: $destination, rowIndex: $rowIndex, pageId: $pageId){
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
    const [reorder, 
        {data: reorderData, loading: reorderLoading, error: reorderError}
    ] = useMutation(REORDER_COMPONENTS);

    const handleDelete = () => {
        console.log(row.rowIndex);
        deleteRow({variables: { rowIndex: row.rowIndex, pageId: pageId}});
    }

    useEffect(() => {

        if (!loading && data){
            console.log("row deleted...")
            console.log(data);
            refresh();
        }
        
    }, [data, loading]);

    useEffect(() => {
        console.log(props);
        setRow(props);       
    }, [props]);

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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        reorder({variables: { 
            source: result.source.index,
            destination: result.destination.index,
            rowIndex: row.rowIndex,
            pageId: pageId
        }});
        const components = Array.from(row.row.contentComponents);
        const [reorderedComponent] = components.splice(result.source.index, 1);
        components.splice(result.destination.index, 0, reorderedComponent);

        setRow( {...row, row : {...row.row, contentComponents : components} });

    }

    return(

        <RowProvider value={row.rowIndex}>
            <Paper elevation={3}>

            
            <Box height="300px" marginTop="5px">
                <Paper elevation={3}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end" {...props.provided.dragHandleProps}>
                        <Button color="primary" onClick={handleOpenDialog} 
                            disabled={row.row.contentComponents.length >= 2 || status !== 'default'} startIcon={<AddIcon/>}>
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

                <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="contentComponents" direction="horizontal">
                {(provided) => (
                <Box display="flex" flexDirection="row" justifyContent="space-around" 
                height="85%" className="contentComponents" {...provided.droppableProps} ref={provided.innerRef}>
                    {row.row.contentComponents.map((c, index)=> {
                        return (
                            <Draggable key={'component' + index.toString()} draggableId={'component' + index.toString()} 
                            index={index}>
                            {(provided) => (
                                <Box width="45%" height="100%" ref={provided.innerRef} {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                    <ComponentProvider value={index}>
                                        <ContentComponent component={c} />
                                    </ComponentProvider>
                                </Box>
                            )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                    
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
                )}
                </Droppable>
                </DragDropContext>

            </Box>
            </Paper>
        </RowProvider>

        
    )
}

export default Row;