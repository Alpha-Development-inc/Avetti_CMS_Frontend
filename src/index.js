import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  "./components/MainPage";
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto';
import {IKContext} from 'imagekitio-react';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider
 } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

//WRITTEN BY ALEXANDER

const httpLink = createUploadLink({uri: 'http://localhost:8080/graphql'});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const urlEndpoint = 'https://ik.imagekit.io/g56fnhdh8px/';

ReactDOM.render(
  <ApolloProvider client={client}>
    <IKContext urlEndpoint={urlEndpoint}>
    <App/>
    </IKContext>
  </ApolloProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
