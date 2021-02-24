import { Box, Button, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Demo from './Dialog';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';

const Row =(props)=>{
    const [rowComponents,setRowComponents]=useState([]);

    function addNewComponent(){
        ReactDOM.render(<Demo />, document.querySelector('#root'));
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

    return(
        <Box height="33%" border={2} borderColor="primary.main" borderRadius="10px" marginTop="5px">
            <Paper elevation={3}>
                <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <Button color="primary" startIcon={<AddIcon/>}>Add Component</Button>
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