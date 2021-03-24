import React, { createContext, useState } from 'react';
import Row from "./Row";
import ReactDOM from 'react-dom';

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import CreateRow from './CreateRow';
import CreatePage from './CreatePage';
import Loading from './Loading';
import { PageProvider } from '../contexts/PageContext';
import { RefreshProvider } from '../contexts/RefreshContext';

const Page =(props)=>{

    const PAGE = gql`{
        page(title:"${props.match.params.pageTitle}"){
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


    useEffect(()=>{
        if (!loading && data){
            console.log('page loaded...');
            console.log(data.page);
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
        <PageProvider value={page.id}>
            <RefreshProvider value={setRefresh}>
                <Box height="100%" display="flex" flexDirection="column" width="60%" marginX="auto">
                    {page.contentRows.map((g, index)=>(
                    <Row rowIndex={index} rowComponents={g.contentComponents}/>
                    ))}
                    <CreateRow/>
                </Box>
            </RefreshProvider>
        </PageProvider>

        
    )
}
export default Page;





