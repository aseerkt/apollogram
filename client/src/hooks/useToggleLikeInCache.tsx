import { ApolloCache, gql } from '@apollo/client';
import { ToggleLikeMutation } from '@/generated/graphql';

export default function useToggleLikeInCache() {
  return (cache: ApolloCache<ToggleLikeMutation>, postId: string) => {
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
          likeCount: prevLikeData.likeCount + (prevLikeData.userLike ? -1 : 1),
        },
      });
    }
  };
}
