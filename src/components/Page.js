import React, { useState } from 'react';
import Row from "./Row";

import { useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import CreateRow from './CreateRow';
import CreatePage from './CreatePage';
import Loading from './Loading';
import { PageProvider } from '../contexts/PageContext';
import { RefreshProvider } from '../contexts/RefreshContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Page = (props) => {

    const PAGE = gql`{
        page(title:"${props.pageTitle}"){
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
    const REORDER_ROWS = gql`
        mutation ReorderRows($source: Int!, $destination: Int!, $pageId: String!) {
            reorderRows(source: $source, destination: $destination, pageId: $pageId){
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

    const [page,setPage]=useState({
        contentRows:[]
    });
    const [refresh, setRefresh] = useState(true);

    const {loading, error, data } = useQuery(PAGE);
    const [reorder, 
        {data: reorderData, loading: reorderLoading, error: reorderError}
    ] = useMutation(REORDER_ROWS);

    const handleRefresh = () => {
        console.log('state variable is changed');
        setRefresh(!refresh);
    }

    useEffect(()=>{
        if (!loading && data){
            console.log('page loaded...');
            setPage(data.page);
        }
    },[loading, data]);

    // useEffect(()=>{
    //     if (!reorderLoading && reorderData){
    //         console.log('rows reorderded...');
    //         console.log(reorderData);
    //         setPage(reorderData.reorderRows);
    //     }
    // },[reorderLoading, reorderData]);

    const handleAddPage = (newPage) => {
        console.log("in handle add page....")
        setPage(newPage);
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        reorder({variables: { 
            source: result.source.index,
            destination: result.destination.index,
            pageId: page.id
        }});
        const rows = Array.from(page.contentRows);
        const [reorderedRow] = rows.splice(result.source.index, 1);
        rows.splice(result.destination.index, 0, reorderedRow);

        setPage( {...page, contentRows : rows });

    }

    if (loading) return (<Loading/>);
    if (error) return <p>Error :(</p>;

    if (!page) {return (<CreatePage pageTitle={props.pageTitle} addPage={handleAddPage}/>)}    

    return(
        <PageProvider value={page.id}>
            <RefreshProvider value={handleRefresh}>
                <Box display="flex" flexDirection="column" width="60%" marginX="auto">  
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="contentRows">
                            {(provided) => (
                            <Box width="100%" className="contentRows" {...provided.droppableProps} ref={provided.innerRef}>
                                {page.contentRows.map((r, index)=>{
                                    return (
                                        <Draggable key={r.title + index.toString()} draggableId={r.title + index.toString()} 
                                        index={index}>
                                            {(provided, snapshot) => (
                                                <Box width="100%" ref={provided.innerRef} {...provided.draggableProps}
                                                isDragging={snapshot.isDragging}>
                                                    <Row rowIndex={index} row={r} provided={provided}/>
                                                </Box>
                                                
                                            )}
                                        </Draggable>                                       
                                    );
                                })}
                                {provided.placeholder}
                            </Box>
                            )}
                        </Droppable>  
                    </DragDropContext>
                    <CreateRow/>
                </Box>
            </RefreshProvider>
        </PageProvider>

        
    )
};
export default Page;





