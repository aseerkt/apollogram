import { Post } from '../gql/graphql'
import { GetUserQueryDocument } from '../graphql/queries'
import Alert from '../shared/Alert'
import Spinner from '../shared/Spinner'
import { useGqlQuery } from '../utils/react-query-gql'
import PostsGrid from './PostsGrid'

const UserPosts: React.FC<{ username: string }> = ({ username }) => {
  const { data, isFetching, error } = useGqlQuery(GetUserQueryDocument, {
    variables: { username },
  })

  if (isFetching) {
    return <Spinner />
  } else if (error) {
    return <Alert severity='danger'>{JSON.stringify(error)}</Alert>
  }
  return data?.getUser?.posts ? (
    <PostsGrid posts={data.getUser.posts as Post[]} />
  ) : null
}

export default UserPosts
