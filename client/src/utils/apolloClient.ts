import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_EXPRESS_URI}/graphql`,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: uploadLink as any,
  cache: new InMemoryCache(),
});
