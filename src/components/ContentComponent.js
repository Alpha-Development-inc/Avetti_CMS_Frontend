import { Box, Button, Paper,Dialog,DialogActions, Card, CardHeader, IconButton, CardContent, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import ComponentContext from '../contexts/ComponentContext';
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import RefreshContext from '../contexts/RefreshContext';
import Loading from './Loading';

const ContentComponent =(props)=>{

    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext);
    const componentIndex = useContext(ComponentContext);
    const refreshPage = useContext(RefreshContext);

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
    }

    useEffect(() => {

      if (!loading && data){
        console.log('component deleted');
        refreshPage();
      }
      
    }, [data, loading]);

    if (loading) {return <Loading/>}


    return(

            <Box margin="5px" width="100%" height="100%">

                

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