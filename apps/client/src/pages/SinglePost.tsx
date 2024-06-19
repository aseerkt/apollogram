import dayjs from 'dayjs'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddComment from '../components/AddComment'
import PostActions from '../components/PostActions'
import PostOptions from '../components/PostOptions'
import UserPosts from '../components/UserPosts'
import { Post, useGetSinglePostQuery } from '../generated/graphql'
import Avatar from '../shared/Avatar'
import Card from '../shared/Card'
import Container from '../shared/Container'
import Spinner from '../shared/Spinner'

const SinglePost = () => {
  const { postId }: any = useParams()
  const { data, loading } = useGetSinglePostQuery({ variables: { postId } })

  const addCommentRef = useRef<HTMLInputElement>(null)

  if (loading) {
    return <Spinner />
  } else if (!data?.getSinglePost) {
    return null
  }

  const {
    id,
    user,
    caption,
    comments,
    likeCount,
    userLike,
    createdAt,
    imgURL,
  } = data.getSinglePost

  const handleCommentAction = () => addCommentRef.current?.focus()

  return (
    <Container>
      <Card className='min-h-450 relative mb-10 flex h-full flex-col'>
        {/* header */}
        <header className='static right-0 top-0 flex h-20 items-center justify-between border-b border-gray-300 px-3 md:absolute md:w-80 md:border-l'>
          <div className='flex items-center'>
            <Link to={`/u/${user.username}`} className='flex items-center'>
              <Avatar className='my-2 cursor-pointer' src={user.imgURL} />
              <span className='ml-2 font-semibold'>{user.username}</span>
            </Link>
          </div>
          {/* TODO Icon Button */}
          <PostOptions post={data.getSinglePost as Post} />
        </header>
        {/* Media */}
        <div className='flex flex-1 flex-col justify-center bg-gray-800 md:mr-80 md:h-full'>
          <img
            loading='lazy'
            className='mr-0 w-full md:h-full md:object-cover'
            src={imgURL}
            alt={caption}
          />
        </div>
        <div className='static bottom-0 right-0 top-20 flex flex-col justify-between md:absolute md:w-80 md:border-l md:border-gray-300'>
          <div className='flex h-full flex-col justify-between'>
            <div className='overflow-y-auto px-3 md:min-h-48'>
              {/* Post Caption */}
              <div className='mb-3 flex border-b py-2'>
                <Link to={`/u/${user.username}`} className='mr-2 font-semibold'>
                  <Avatar
                    className='my-2 cursor-pointer ring-2 ring-red-500'
                    src={user.imgURL}
                  />
                </Link>
                <div className='mt-2 flex flex-col'>
                  <div>
                    <Link
                      to={`/u/${user.username}`}
                      className='mr-1 inline-block font-semibold hover:underline'
                    >
                      {user.username}
                    </Link>
                    <span>{caption}</span>
                  </div>
                  <span className='mt-2 text-sm text-gray-400'>
                    {dayjs(createdAt).fromNow(true)}
                  </span>
                </div>
              </div>

              {/* Comments */}
              <div className='comments-container my-1'>
                {comments.map((comment) => (
                  <div key={comment.id} className='mt-2 flex'>
                    <Link
                      to={`/u/${comment.user.username}`}
                      className='mr-2 font-semibold'
                    >
                      <Avatar
                        className='cursor-pointer'
                        src={comment.user.imgURL}
                      />
                    </Link>
                    <div className='flex flex-col'>
                      <div className='flex space-x-1'>
                        <Link
                          to={`/u/${comment.user.username}`}
                          className='flex font-semibold hover:underline'
                        >
                          {comment.user.username}
                        </Link>
                        <span>{comment.text}</span>
                      </div>
                      <span className='mt-2 text-sm text-gray-400'>
                        {dayjs(comment.createdAt).fromNow(true)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Like And Comment Button */}
            <div>
              <PostActions
                className='p-3'
                postId={id}
                onCommentAction={handleCommentAction}
                userLike={userLike}
              />
              {/* Like Count */}
              <p className='px-3 font-semibold'>
                {likeCount} like{likeCount === 1 ? '' : 's'}
              </p>
              {/* TimeStamp */}
              <Link
                to={`/p/${id}`}
                className='px-3 py-1 text-xs uppercase text-gray-500'
              >
                {dayjs(createdAt).fromNow()}
              </Link>
              <AddComment customRef={addCommentRef} postId={id} />
            </div>
          </div>
        </div>
      </Card>
      <section className='mt-10 border-t pt-10'>
        <h3 className='mb-3 font-bold text-gray-500'>
          More posts from
          <Link
            to={`/u/${user.username}`}
            className='ml-1 font-semibold text-black hover:underline'
          >
            {user.username}
          </Link>
        </h3>
        <UserPosts username={user.username} />
      </section>
    </Container>
  )
}

export default SinglePost
