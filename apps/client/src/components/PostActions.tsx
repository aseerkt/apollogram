import { BsChat } from 'react-icons/bs'
import LikeButton from './LikeButton'

interface PostActionsProps {
  postId: string
  userLike: boolean
  onCommentAction: () => void
  className?: string
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLike,
  onCommentAction,
  className,
}) => {
  return (
    <div className={`flex items-center space-x-3 pb-2 ${className}`}>
      <LikeButton postId={postId} userLike={userLike} />
      <BsChat
        role='button'
        size='1.8em'
        onClick={onCommentAction}
        className='mb-1 cursor-pointer'
      />
    </div>
  )
}

export default PostActions
