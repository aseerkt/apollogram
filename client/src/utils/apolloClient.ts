import {
  ApolloClient,
  FieldPolicy,
  FieldReadFunction,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { PaginatedPost } from '../generated/graphql';

const uploadLink = createUploadLink({
  uri: `${import.meta.env.VITE_EXPRESS_URI}/graphql`,
  credentials: 'include',
});

function customOffsetPagination():
  | FieldPolicy<any, any, any>
  | FieldReadFunction<any, any> {
  return {
    keyArgs: false,
    merge: function (
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
  };
}

export const apolloClient = new ApolloClient({
  link: uploadLink as any,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: customOffsetPagination(),
          getExplorePosts: customOffsetPagination(),
        },
      },
    },
  }),
});
