import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import LikeButton from './LikeButton';

interface PostActionsProps {
  postId: string;
  userLike: boolean;
  addCommentRef: React.RefObject<HTMLInputElement>;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLike,
  addCommentRef,
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(userLike);
  }, [userLike]);

  const history = useHistory();
  const location = useLocation();
  return (
    <div className='flex items-center pb-2'>
      <LikeButton postId={postId} liked={liked} setLiked={setLiked}>
        {liked ? (
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
          if (location.pathname === '/posts') {
            history.push(`/p/${postId}`);
          } else {
            addCommentRef.current?.focus();
          }
        }}
        className='cursor-pointer'
      />
    </div>
  );
};

export default PostActions;
