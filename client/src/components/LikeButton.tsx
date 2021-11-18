import { useToggleLikeMutation } from '../generated/graphql';
import useToggleLikeInCache from '../hooks/useToggleLikeInCache';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import Spinner from '../components-ui/Spinner';

interface LikeButtonProps {
  postId: string;
  userLike: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, userLike }) => {
  const toggleLikeInCache = useToggleLikeInCache();

  const [toggleLike, { loading }] = useToggleLikeMutation({
    variables: { postId },
    update: (cache, { data }) => {
      if (data?.toggleLike) {
        toggleLikeInCache(cache, postId);
      }
    },
  });

  const likeAction = async () => {
    try {
      const res = await toggleLike();
      if (res.data && res.data?.toggleLike) {
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <button onClick={likeAction}>
      {loading ? (
        <Spinner size='small' />
      ) : userLike ? (
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
