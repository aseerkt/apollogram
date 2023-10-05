import { useToggleLikeMutation } from '../generated/graphql';
import useToggleLikeInCache from '../hooks/useToggleLikeInCache';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMessageCtx } from '@/context/MessageContext';

interface LikeButtonProps {
  postId: string;
  userLike: boolean;
}

const TOGGLE_LIKE_FAIL_MESSAGE = 'Unable to toggle like for post';

const LikeButton: React.FC<LikeButtonProps> = ({ postId, userLike }) => {
  const toggleLikeInCache = useToggleLikeInCache();
  const { setMessage } = useMessageCtx();

  const [toggleLike] = useToggleLikeMutation({
    variables: { postId },
    update: (cache, { data }) => {
      if (!data?.toggleLike) {
        toggleLikeInCache(postId, cache);
        setMessage(TOGGLE_LIKE_FAIL_MESSAGE);
      }
    },
  });

  const likeAction = async () => {
    try {
      toggleLikeInCache(postId);
      await toggleLike();
    } catch (err) {
      toggleLikeInCache(postId);
      setMessage(TOGGLE_LIKE_FAIL_MESSAGE);
    }
  };

  return (
    <button onClick={likeAction}>
      {userLike ? (
        <BsHeartFill
          size='1.9em'
          className='text-red-600 duration-150 transform cursor-pointer active:scale-110'
        />
      ) : (
        <BsHeart
          size='1.9em'
          className='duration-150 transform cursor-pointer active:scale-110'
        />
      )}
    </button>
  );
};

export default LikeButton;
