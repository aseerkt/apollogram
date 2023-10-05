import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { useMessageCtx } from '@/context/MessageContext';
import {
  GetFollowSuggestionsDocument,
  GetPostsDocument,
  useGetFollowsQuery,
  useMeQuery,
  User,
  useToggleFollowMutation,
} from '@/generated/graphql';

const useToggleFollowHook = (user: User) => {
  const { setMessage } = useMessageCtx();
  const [toggleFollow, { loading: toggling }] = useToggleFollowMutation();
  const { data: meData } = useMeQuery();
  const me = meData!.me!;
  const { data: selectedUserFollows } = useGetFollowsQuery({
    variables: { username: user?.username },
    skip: !user?.username,
    fetchPolicy: 'cache-only',
  });
  const { data: currentUserFollows } = useGetFollowsQuery({
    variables: { username: me.username },
    fetchPolicy: 'cache-only',
  });

  const onToggle = useCallback(
    (user: User) => async () => {
      if (!user || me.id === user.id) return;
      try {
        const { id: userId, username, isFollowing } = user;

        await toggleFollow({
          variables: { followingUsername: username },
          refetchQueries: [
            { query: GetPostsDocument, variables: { limit: 4 } },
            { query: GetFollowSuggestionsDocument },
          ],
          update: (cache, { data }) => {
            if (data?.toggleFollow) {
              // Update isFollowing
              cache.writeFragment<{ isFollowing: boolean }>({
                fragment: gql`
                  fragment FollowFragment on User {
                    isFollowing
                  }
                `,
                id: 'User:' + userId,
                data: { isFollowing: !isFollowing },
                broadcast: false,
              });
              if (selectedUserFollows)
                cache.evict({
                  fieldName: 'getFollows',
                  args: { username: user.username },
                });
              if (currentUserFollows)
                cache.evict({
                  fieldName: 'getFollows',
                  args: { username: me.username },
                });

              setMessage(
                `${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`
              );
              // cache.evict({ fieldName: 'getPosts' });
              // cache.evict({ fieldName: 'getExplorePosts' });
            }
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return { toggling, onToggle: onToggle(user) };
};

export default useToggleFollowHook;
