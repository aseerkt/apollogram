import { gql } from '@apollo/client';
import { useToggleLikeMutation } from '../generated/graphql';

interface LikeButtonProps {
  postId: string;
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  children,
  liked,
  setLiked,
}) => {
  const [toggleLike] = useToggleLikeMutation({
    variables: { postId },
    update: (cache, { data }) => {
      if (data?.toggleLike) {
        const prevLikeData = cache.readFragment<{
          userLike: boolean;
          likeCount: number;
        }>({
          id: 'Post:' + postId,
          fragment: gql`
            fragment ReadLike on Post {
              userLike
              likeCount
            }
          `,
        });
        if (prevLikeData) {
          const fragment = gql`
            fragment ToggleLike on Post {
              userLike
              likeCount
            }
          `;
          cache.writeFragment<{ userLike: boolean; likeCount: number }>({
            id: 'Post:' + postId,
            broadcast: false,
            fragment,
            data: {
              userLike: !prevLikeData.userLike,
              likeCount:
                prevLikeData.likeCount + (prevLikeData.userLike ? -1 : 1),
            },
          });
        }
      }
    },
  });

  const likeAction = async () => {
    setLiked(!liked);
    try {
      const res = await toggleLike();
      if (res.data?.toggleLike) {
        console.log('like toggled successfully');
      }
    } catch (err) {
      console.log(err);
      setLiked(liked);
    }
  };

  return <div onClick={likeAction}>{children}</div>;
};

export default LikeButton;
