import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import reportWebVitals from './reportWebVitals';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: uploadLink as any,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ['username'],
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
