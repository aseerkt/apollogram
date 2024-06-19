import dayjs from 'dayjs'
import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../gql/graphql'
import Avatar from '../shared/Avatar'
import Card from '../shared/Card'
import AddComment from './AddComment'
import PostActions from './PostActions'
import PostOptions from './PostOptions'

interface PostCardProps {
  post: Post
  isCurrentUserPost: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, isCurrentUserPost }) => {
  const {
    id,
    user,
    imgURL,
    caption,
    likeCount,
    userLike,
    comments,
    createdAt,
  } = post

  const twoComments = useMemo(() => comments.slice(-2).reverse(), [comments])

  const addCommentRef = useRef<HTMLInputElement>(null)

  const handleCommentAction = () => {
    addCommentRef.current?.focus()
  }

  return (
    <Card id={id} className='mb-16 w-full'>
      {/* header */}
      <div className='flex items-center justify-between border-b border-gray-300 px-3'>
        <div className='flex items-center'>
          <Link to={`/u/${user.username}`} className='flex items-center'>
            <Avatar className='my-2 cursor-pointer' src={user.imgURL} />
            <span className='ml-2 font-semibold hover:underline'>
              {user.username}
            </span>
          </Link>
        </div>
        {/* TODO Icon Button */}
        <PostOptions post={post} isCurrentUserPost={isCurrentUserPost} />
      </div>
      {/* Media */}
      <Link to={`/p/${id}`} className='flex w-full items-center'>
        <img
          loading='lazy'
          className='min-h-48 w-full'
          src={imgURL}
          alt={caption}
        />
      </Link>
      {/* Likes and comments */}
      <div className='h-full'>
        <div className='flex flex-col justify-between px-3 py-2'>
          {/* Like And Comment Button */}
          <PostActions
            postId={id}
            userLike={userLike}
            onCommentAction={handleCommentAction}
          />
          {/* Like Count */}
          <p className='font-semibold'>
            {likeCount} like{likeCount !== 1 ? 's' : ''}
          </p>
          {/* Post Caption */}
          <div>
            <Link
              to={`/u/${user.username}`}
              className='mr-1 font-semibold hover:underline'
            >
              {user.username}
            </Link>
            <span>{caption}</span>
          </div>
          {/* Comment Count */}
          {comments.length > 2 && (
            <Link to={`/p/${id}`} className='cursor-pointer py-1 text-gray-600'>
              View all {comments.length} comments
            </Link>
          )}
          {/* Comments */}
          <div className='py-1'>
            {twoComments.map((c) => (
              <p key={c.id} className=''>
                <Link
                  to={`/u/${c.user.username}`}
                  className='mr-1 font-semibold hover:underline'
                >
                  {c.user.username}
                </Link>

                {c.text}
              </p>
            ))}
          </div>
          {/* TimeStamp */}
          <Link
            to={`/p/${id}`}
            className='py-1 text-xs uppercase text-gray-500'
          >
            {dayjs(createdAt).fromNow()}
          </Link>
        </div>
        <AddComment customRef={addCommentRef} postId={id} />
      </div>
    </Card>
  )
}

export default PostCard
