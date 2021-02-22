import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  "./components/MainPage";
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto';

import { 
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
 } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  fetchOptions: {
    mode: 'no-cors'
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// client.query({
//     query: gql`
//       {
//         allPages {
//           title
//         }
//       }
//       `
//   })
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
