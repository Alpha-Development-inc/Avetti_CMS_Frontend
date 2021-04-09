import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';


//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const LoginDialog=(props)=> {

const [login, setLogin] =useState();
const [pw, setPw] =useState();
 
  const handleLogin=()=>{
      localStorage.setItem('login', "t");
      if (login==='admin' && pw ==='admin'){
          props.setLogin(true);
          props.close();
      }
  }


  return (
    <div>
      
      <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please login to open admin mode
          </DialogContentText>
          <Box margin="5px">
            <TextField label="username" variant="filled" onChange={(e) =>setLogin(e.target.value)} />
          </Box>
          <Box margin="5px">
            <TextField label="password" variant="filled" onChange={(e) =>setPw(e.target.value)} />
          </Box>
            <label style={{color: "red"}} id='error' class></label>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }

export default LoginDialog;