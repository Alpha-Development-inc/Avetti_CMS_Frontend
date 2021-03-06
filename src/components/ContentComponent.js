import { Box, Button, Paper,Dialog,DialogActions } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import CreateComponentDialog from './CreateComponentDialog'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';
import { RowProvider } from '../contexts/RowContext';
import { IKImage } from 'imagekitio-react';

const ContentComponent =(props)=>{

    const [rowComponents,setRowComponents]=useState([]);


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
    return(

            <Box width="45%" margin="5px">
                <Paper elevation={3}>
                    <Box display="flex" justifyContent="center">
                        {props.component.type === 'image' &&
                            <IKImage path={props.component.content} width="200"/>
                        }
                    </Box>
                </Paper>
            </Box>

        
    )
}

export default ContentComponent;