import {
  ApolloClient,
  FieldPolicy,
  FieldReadFunction,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { PaginatedPost } from '../generated/graphql';
import { setContext } from '@apollo/client/link/context';
import { getToken } from './auth';

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

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_EXPRESS_URI}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
