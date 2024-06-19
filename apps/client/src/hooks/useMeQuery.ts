import { MeQueryDocument } from '../graphql/queries'
import { useGqlQuery } from '../utils/react-query-gql'

export function useMeQuery() {
  const { data, ...rest } = useGqlQuery(MeQueryDocument, {})

  return {
    currentUser: data?.me,
    ...rest,
  }
}
