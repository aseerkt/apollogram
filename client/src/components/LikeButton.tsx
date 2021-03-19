import {
  GetSinglePostDocument,
  useToggleLikeMutation,
} from '../generated/graphql';

interface LikeButtonProps {
  postId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, children }) => {
  const [toggleLike] = useToggleLikeMutation({
    variables: { postId },
    refetchQueries: [{ query: GetSinglePostDocument, variables: { postId } }],
  });

  const likeAction = async () => {
    try {
      const res = await toggleLike();
      if (res.data?.toggleLike) {
        console.log('like toggled successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <div onClick={likeAction}>{children}</div>;
};

export default LikeButton;
