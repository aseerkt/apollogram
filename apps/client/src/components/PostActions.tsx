import { BsChat } from 'react-icons/bs';
import LikeButton from './LikeButton';

interface PostActionsProps {
  postId: string;
  userLike: boolean;
  addCommentRef: React.RefObject<HTMLInputElement>;
  className?: string;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLike,
  addCommentRef,
  className,
}) => {
  return (
    <div className={`flex items-center space-x-3 pb-2 ${className}`}>
      <LikeButton postId={postId} userLike={userLike} />
      <BsChat
        size='1.8em'
        onClick={() => addCommentRef.current?.focus()}
        className='mb-1 cursor-pointer'
      />
    </div>
  );
};

export default PostActions;
