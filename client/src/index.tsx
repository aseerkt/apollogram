import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink as any,
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
