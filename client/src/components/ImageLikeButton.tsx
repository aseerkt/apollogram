import {
  GetSinglePostDocument,
  useToggleLikeMutation,
} from '../generated/graphql';

interface ImageLikeButtonProps {
  postId: string;
  liked: boolean;
}

const ImageLikeButton: React.FC<ImageLikeButtonProps> = ({
  postId,
  liked,
  children,
}) => {
  const [toggleLike] = useToggleLikeMutation({
    variables: { postId },
    refetchQueries: [{ query: GetSinglePostDocument, variables: { postId } }],
  });

  const likeAction = async () => {
    if (!liked) {
      try {
        const res = await toggleLike();
        if (res.data?.toggleLike) {
          console.log('like toggled successfully');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return <div onDoubleClick={likeAction}>{children}</div>;
};

export default ImageLikeButton;
