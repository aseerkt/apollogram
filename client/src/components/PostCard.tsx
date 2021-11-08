import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { Comment, Post } from '../generated/graphql';
import Avatar from '../components-ui/Avatar';
import Card from '../components-ui/Card';
import AddComment from './AddComment';
import PostOptions from './PostOptions';
import PostActions from './PostActions';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    id,
    user,
    imgURL,
    caption,
    likeCount,
    userLike,
    comments,
    createdAt,
  } = post;
  const [twoComments, setTwoComments] = useState<Comment[]>([]);

  useEffect(() => {
    setTwoComments(
      comments.filter((_, index) => index === 0 || index === 1).reverse()
    );
  }, [comments, setTwoComments]);

  const addCommentRef = useRef<HTMLInputElement>(null);

  return (
    <Card id={id} className='w-full mb-16'>
      {/* header */}
      <div className='flex items-center justify-between px-3 border-b border-gray-300'>
        <div className='flex items-center'>
          <Link to={`/u/${user.username}`} className='flex items-center'>
            <Avatar className='my-2 cursor-pointer' src={user.profile.imgURL} />
            <span className='ml-2 font-semibold hover:underline'>
              {user.username}
            </span>
          </Link>
        </div>
        {/* TODO Icon Button */}
        <PostOptions post={post} />
      </div>
      {/* Media */}
      <img loading='lazy' className='w-full' src={imgURL} alt='' />
      {/* Likes and comments */}
      <div className='h-full'>
        <div className='flex flex-col justify-between px-3 py-2'>
          {/* Like And Comment Button */}
          <PostActions
            postId={id}
            userLike={userLike}
            addCommentRef={addCommentRef}
          />
          {/* Like Count */}
          <p className='font-semibold '>
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
            <Link
              to={`/p/${id}`}
              className='py-1 text-gray-600 cursor-pointer '
            >
              View all {comments.length} comments
            </Link>
          )}
          {/* Comments */}
          <div className='py-1 '>
            {twoComments.map((c: Comment) => (
              <p key={c.id} className=''>
                <Link
                  to={`/u/${c.username}`}
                  className='mr-1 font-semibold hover:underline'
                >
                  {c.username}
                </Link>

                {c.text}
              </p>
            ))}
          </div>
          {/* TimeStamp */}
          <Link
            to={`/p/${id}`}
            className='py-1 text-xs text-gray-500 uppercase'
          >
            {dayjs(createdAt).fromNow()}
          </Link>
        </div>
        <AddComment customRef={addCommentRef} postId={id} />
      </div>
    </Card>
  );
};

export default PostCard;
