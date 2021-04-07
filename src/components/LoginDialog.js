
import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ArrowRightAltOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';

import ReactDOM from 'react-dom'
const LoginDialog=(props)=> {

const [login,setLogin] =useState();
const [pw,setPw] =useState();
 
  const handleLogin=()=>{
      localStorage.setItem('login', "t");
      console.log(login);
      console.log(pw);
      if (login=='admin' && pw =='admin'){
          console.log('login Approved');
          props.setLogin(true);
          props.close();
      }
      else {
          ReactDOM.render(<div >
            oops try again 
            </div>,document.getElementById('error'));
          
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
          {/* <Input
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            onChange={(e) =>setLogin(e.target.value)}

          /> */}
           <TextField id="filled-basic" label="userid" variant="filled" onChange={(e) =>setLogin(e.target.value)} />
          <TextField id="filled-basic" label="password" variant="filled" onChange={(e) =>setPw(e.target.value)} />
           {/* <Input
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            onChange={(e) =>setPw(e.target.value)}
          /> */}
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