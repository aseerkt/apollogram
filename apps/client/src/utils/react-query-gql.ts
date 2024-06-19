import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  DefaultError,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { ExecutableDefinitionNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { getToken } from './auth'
import { GRAPH_ENDPOINT } from './constants'

type UseGqlQueryOptions<
  TResult = unknown,
  TError = Error,
  TVariables = void,
> = Omit<UseQueryOptions<TResult, TError>, 'queryKey' | 'queryFn'> & {
  variables?: TVariables
}

type UseGqlMutationOptions<
  TResult = unknown,
  TError = DefaultError,
  TVariables = void,
> = Omit<UseMutationOptions<TResult, TError, TVariables>, 'mutationFn'>

export const gqlClient = new GraphQLClient(GRAPH_ENDPOINT, {
  headers() {
    const token = getToken()
    return {
      authorization: token ? `Bearer ${token}` : '',
    }
  },
})

export function useGqlQuery<
  TResult = unknown,
  TError = unknown,
  TVariables = void,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  { variables, ...options }: UseGqlQueryOptions<TResult, TError, TVariables>
) {
  return useQuery({
    queryKey: getQueryKey(document, variables),
    queryFn: () => gqlClient.request(document, variables ?? undefined),
    ...options,
  })
}

export function useGqlMutation<
  TResult = unknown,
  TError = DefaultError,
  TVariables = void,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  options: UseGqlMutationOptions<TResult, TError, TVariables>
) {
  return useMutation({
    mutationFn: (variables) =>
      gqlClient.request(document, variables ?? undefined),
    ...options,
  })
}

export function getQueryKey<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
) {
  return [getCacheKey(document), variables]
}

export function getCacheKey<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>
) {
  return (document.definitions[0] as ExecutableDefinitionNode).name?.value
}
