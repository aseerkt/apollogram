import PostsGrid from '../components/PostsGrid'
import { Post, useGetExplorePostsQuery } from '../generated/graphql'
import useScrollPaginate from '../hooks/usePaginate'
import Alert from '../shared/Alert'
import Container from '../shared/Container'
import Spinner from '../shared/Spinner'

const Explore = () => {
  const { data, loading, error, fetchMore, variables } =
    useGetExplorePostsQuery({
      variables: { limit: 12 },
    })

  const loadMore = () => {
    fetchMore({
      variables: {
        limit: variables?.limit,
        offset: data?.getExplorePosts.posts.length || 0,
      },
    })
  }

  useScrollPaginate(
    data?.getExplorePosts.posts,
    data?.getExplorePosts.hasMore,
    loadMore
  )

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <Alert>{error.message}</Alert>
  }

  return (
    <Container>
      {data?.getExplorePosts.posts && (
        <PostsGrid posts={data.getExplorePosts.posts as Post[]} />
      )}
    </Container>
  )
}

export default Explore
