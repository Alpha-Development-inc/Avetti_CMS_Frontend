import React, { useState } from 'react';
import Row from "./Row";
import ReactDOM from 'react-dom';

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import CreateRow from './CreateRow';
import CreatePage from './CreatePage';
import Loading from './Loading';

const Page =(props)=>{

    const PAGE = gql`{
        page(title:"${props.match.params.pageTitle}"){
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

    const [page,setPage]=useState({
        contentRows:[]
    });

    const {loading, error, data } = useQuery(PAGE);

    useEffect(()=>{
        if (!loading && data){
            setPage(data.page);
        }
    },[loading, data]);

    const handleAddPage = (newPage) => {
        console.log("in handle add page....")
        setPage(newPage);
    }

    if (loading) return (<Loading/>);
    if (error) return <p>Error :(</p>;

    if (!page) {return (<CreatePage pageTitle={props.match.params.pageTitle} addPage={handleAddPage}/>)}    

    return(
        
        <Box height="100%" display="flex" flexDirection="column" width="60%" marginX="auto">
            {page.contentRows.map((g, index)=>(
            <Row rowIndex={index} pageId={page.id} rowComponents={g.contentComponents}/>
            ))}
            <CreateRow pageId={page.id}/>
        </Box>
        
    )
}
export default Page;





