import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageWrapper from './components/PageWrapper';
import { AuthProvider } from './contexts/AuthContext'

//-----------------------WRITTEN BY SAVVY-----------------------------------------------------

const App = () =>{
  useEffect(()=>{
    if (localStorage.getItem('login') ){
        console.log('login=true');
        setAuth(true);
    }
  },[]);

  const [auth, setAuth] = useState(false);


  return (
  <AuthProvider value={{auth:auth,updateAuth:setAuth}}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/:pageTitle' component={PageWrapper} />
        </Switch>

      </BrowserRouter>
  </AuthProvider>
    );
};

export default App;
