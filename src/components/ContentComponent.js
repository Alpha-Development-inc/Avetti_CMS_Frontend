import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import ComponentContext from '../contexts/ComponentContext';
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';


//-----------------------WRITTEN BY ALEX-----------------------------------------------------
const ContentComponent =(props)=>{

    const pageId = useContext(PageContext);
    const row = useContext(RowContext);
    const componentIndex = useContext(ComponentContext);

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

    const [deleteComponent, { loading }] = useMutation(DELETE_COMPONENT);

    const handleDelete = () => {
      row.deleteComponent(componentIndex);
      deleteComponent({variables: { componentIndex: componentIndex, rowIndex: row.rowIndex, pageId: pageId}});
    }

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