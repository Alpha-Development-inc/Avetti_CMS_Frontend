import React, { useState } from 'react';
import Row from "./Row";

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Button } from '@material-ui/core';
import CreateRow from './CreateRow';
import CreatePage from './CreatePage';
import Loading from './Loading';
import { PageProvider } from '../contexts/PageContext';
import { RefreshProvider } from '../contexts/RefreshContext';
import Page from './Page';
import PagePreview from './preview/PagePreview';
import LoginDialog from './LoginDialog';
const PageWrapper =(props)=>{

    const [mode, setMode] = useState('preview');
    const [authorized,setAuthorized] = useState('false');
    
    const handleSwitchMode = () => {
        if (mode === 'admin'){
            setAuthorized(false);
            setMode('preview')
        }
        else {
            setMode('admin');
        }
    }

    return(
        
        <Box>
            
            <Box display="flex" justifyContent="center" margin="5px">
                
                <Button variant="contained" color="primary" size="large" onClick={handleSwitchMode}>
                    {mode === 'admin' &&
                   
                       <div>Preview Mode</div> 

                    }
                    {mode === 'preview' &&
                        <div>Admin Mode</div>
                    }
                </Button>
            </Box>
            { mode === 'admin' && authorized === false &&
                <LoginDialog setLogin={setAuthorized} />
            }
        
            {authorized === true && mode === 'admin' &&
                             <Page pageTitle={props.match.params.pageTitle}/>
            }
            {mode === 'preview' &&
                <PagePreview pageTitle={props.match.params.pageTitle}/>
            }
        
        </Box>  


     

    )
}
export default PageWrapper;
