import { ApolloCache, gql, useApolloClient } from '@apollo/client';
import { ToggleLikeMutation } from '@/generated/graphql';

export default function useToggleLikeInCache() {
  const client = useApolloClient();
  return (postId: string, cache?: ApolloCache<ToggleLikeMutation>) => {
    let cacheModifier = cache ?? client;

    const postCacheRef = `Post:${postId}`;
    const prevLikeData = cacheModifier.readFragment<{
      userLike: boolean;
      likeCount: number;
    }>({
      id: postCacheRef,
      fragment: gql`
        fragment ReadLike on Post {
          userLike
          likeCount
        }
      `,
    });
    console.log('cacheModifier', cacheModifier);
    console.log(prevLikeData);
    if (prevLikeData) {
      const fragment = gql`
        fragment ToggleLike on Post {
          userLike
          likeCount
        }
      `;
      const stuff = cacheModifier.writeFragment<{
        __typename: string;
        userLike: boolean;
        likeCount: number;
      }>({
        id: postCacheRef,
        // broadcast: false,
        fragment,
        data: {
          __typename: 'Post',
          userLike: !prevLikeData.userLike,
          likeCount: prevLikeData.likeCount + (prevLikeData.userLike ? -1 : 1),
        },
      });
      console.log(stuff);
    }
  };
}
