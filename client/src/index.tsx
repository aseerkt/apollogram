import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import './index.css';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_API_URI || 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
