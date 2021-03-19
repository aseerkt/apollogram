import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: uploadLink as any,
  cache: new InMemoryCache(),
});
