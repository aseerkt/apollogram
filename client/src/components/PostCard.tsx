import { useState, useEffect } from 'react';
import Avatar from '../components-ui/Avatar';
import Card from '../components-ui/Card';
import { Comment, MeDocument, Post } from '../generated/graphql';
import { MdMoreHoriz } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import AddComment from './AddComment';
import LikeButton from './LikeButton';
import { apolloClient } from '..';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useHistory } from 'react-router-dom';
import { useRef } from 'react';
import ImageLikeButton from './ImageLikeButton';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({
  post: { user, imgURL, caption, likeCount, userLike, comments, id, createdAt },
}) => {
  const { me } = apolloClient.readQuery({ query: MeDocument });
  const [twoComments, setTwoComments] = useState<any>([]);

  useEffect(() => {
    setTwoComments(
      comments.filter((_, index) => index === 0 || index === 1).reverse()
    );
  }, [comments, setTwoComments]);

  const history = useHistory();
  const addCommentRef = useRef<HTMLInputElement>(null);

  return (
    <Card className='mb-16'>
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
        <button>
          <MdMoreHoriz size='1.5em' />
        </button>
      </div>
      {/* Media */}
      <ImageLikeButton postId={id} liked={userLike}>
        <img className='w-full' src={imgURL} alt='' />
      </ImageLikeButton>
      {/* Likes and comments */}
      <div className='h-full'>
        <div className='flex flex-col justify-between px-3 py-2'>
          {/* Like And Comment Button */}
          <div className='flex items-center pb-2'>
            <LikeButton postId={id}>
              {userLike ? (
                <FaHeart
                  size='2em'
                  className='mr-2 text-red-600 duration-150 transform cursor-pointer active:scale-110'
                />
              ) : (
                <FaRegHeart
                  size='2em'
                  className='mr-2 duration-150 transform cursor-pointer active:scale-110'
                />
              )}
            </LikeButton>
            <RiChat1Line
              size='2.3em'
              onClick={() => {
                if (history.location.pathname === '/posts') {
                  history.push(`/p/${id}`);
                } else {
                  addCommentRef.current?.focus();
                }
              }}
              className='cursor-pointer'
            />
          </div>
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
