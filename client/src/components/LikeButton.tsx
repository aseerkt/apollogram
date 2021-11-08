import { useEffect } from 'react';
import { useToggleLikeMutation } from '../generated/graphql';
import useToggleLikeInCache from '../hooks/useToggleLikeInCache';

interface LikeButtonProps {
  postId: string;
  userLike: boolean;
  setTogglingLike: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  setTogglingLike,
  children,
}) => {
  const toggleLikeInCache = useToggleLikeInCache();

  const [toggleLike, { loading }] = useToggleLikeMutation({
    variables: { postId },
    update: (cache, { data }) => {
      if (data?.toggleLike) {
        toggleLikeInCache(cache, postId);
      }
    },
  });

  useEffect(() => {
    setTogglingLike(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const likeAction = async () => {
    try {
      const res = await toggleLike();
      if (res.data && res.data?.toggleLike) {
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return <button onClick={likeAction}>{children}</button>;
};

export default LikeButton;
