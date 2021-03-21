import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { PaginatedPost } from '../generated/graphql';

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_EXPRESS_URI}/graphql`,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: uploadLink as any,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(
              existing: PaginatedPost | undefined,
              incoming: PaginatedPost,
              { args }
            ) {
              if (args) {
                const offset = args.offset || 0;
                const mergedPosts = existing ? existing.posts.slice(0) : [];
                for (let i = 0; i < incoming.posts.length; ++i) {
                  mergedPosts[offset + i] = incoming.posts[i];
                }
                return { ...incoming, posts: mergedPosts };
              }
            },
          },
        },
      },
    },
  }),
});
