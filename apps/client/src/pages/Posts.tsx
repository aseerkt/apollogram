import { keepPreviousData } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MiniProfileView from '../components/MiniProfileView'
import PostCard from '../components/PostCard'
import { Post } from '../gql/graphql'
import { GetPostsQueryDocument } from '../graphql/queries'
import { useMeQuery } from '../hooks/useMeQuery'
import Alert from '../shared/Alert'
import Container from '../shared/Container'
import Spinner from '../shared/Spinner'
import { useGqlQuery } from '../utils/react-query-gql'

const Posts: React.FC = () => {
  const [pageParams, setPageParams] = useState({ limit: 3, offset: 0 })

  const { data, isFetching, error } = useGqlQuery(GetPostsQueryDocument, {
    variables: pageParams,
    placeholderData: keepPreviousData,
  })

  const { currentUser } = useMeQuery()

  const loadMore = () => {
    setPageParams({
      limit: pageParams.limit,
      offset: data?.getPosts.posts.length || 0,
    })
  }

  useScrollPaginate(data?.getPosts.posts, data?.getPosts.hasMore, loadMore)

  if (isFetching) {
    return <Spinner />
  } else if (error) {
    return <Alert>{error.message}</Alert>
  }

  return (
    <Container>
      <div className='pt-15 flex w-full flex-wrap justify-between'>
        {data && data.getPosts.posts.length > 0 ? (
          <>
            <div className='sm:w-full md:w-8/12'>
              {data.getPosts.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post as Post}
                  isCurrentUserPost={currentUser?.id === post.user.id}
                />
              ))}
            </div>
            <div className='relative hidden flex-1 md:ml-4 md:block'>
              {data && data.getPosts.posts.length > 0 && <MiniProfileView />}
            </div>
          </>
        ) : (
          <div className='mx-auto w-full sm:w-9/12 md:w-6/12'>
            <h1 className='text-lg font-bold'>No Posts from your followings</h1>
            <p>
              Follow more people or{' '}
              <Link className='text-blue-600' to='/explore'>
                Explore
              </Link>
            </p>
            <MiniProfileView />
          </div>
        )}
      </div>
    </Container>
  )
}

export default Posts
