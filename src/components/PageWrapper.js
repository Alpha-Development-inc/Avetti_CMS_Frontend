import React, { useState } from 'react';
import  { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import Page from './Page';
import PagePreview from './preview/PagePreview';
import LoginDialog from './LoginDialog';
import AuthContext from '../contexts/AuthContext';


//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const PageWrapper =(props)=>{
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('preview');
    const auth = useContext(AuthContext);
    
    const handleDialogue=()=>{
        setOpen(!open);
    }
    const handleLogOut=()=>{
        localStorage.clear();
        setMode('preview');
        auth.updateAuth(false);
    }
    const handleSwitchMode = () => {
        if (mode === 'admin'){
            setMode('preview')
        }
        else {
            setMode('admin');
        }
    }
    const handleLogin=(s)=>{
        
        auth.updateAuth(s);
    }

    return(
        
        <Box>
            
            <Box width="54%" marginX="auto" display="flex"  margin="5px">
                {auth.auth &&
                    <Button variant="contained" color="primary" size="large" onClick={handleSwitchMode}>
                        
                        {mode === 'admin' &&
                    
                        <div>Preview Mode</div> 

                        }
                        {mode === 'preview' &&
                            <div>Admin Mode</div>
                        }
                    </Button>
                }
                <div className='spacer'></div>
                <Box>
                    {auth.auth===true && 
                        
                        <Button  variant="contained" color="secondary" size="large" onClick={handleLogOut}>
                            <div>logout</div>
                        </Button>
                    }
                    {!auth.auth && 
                        
                        <Button variant="contained" color="primary" size="large" onClick={handleDialogue}>
                            <div>login</div>
                        </Button>

                    }
                </Box>
            </Box>
                <LoginDialog setLogin={handleLogin} open={open} close={handleDialogue} />
            
                {auth.auth === true && mode === 'admin' &&
                                <Page pageTitle={props.match.params.pageTitle}/>
                }
                {mode === 'preview' &&
                    <PagePreview pageTitle={props.match.params.pageTitle}/>
                }
        
        </Box>  


     

    )
}
export default PageWrapper;
