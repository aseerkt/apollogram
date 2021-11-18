import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { useMessageCtx } from '@/context/MessageContext';
import {
  GetExplorePostsDocument,
  GetFollowSuggestionsDocument,
  GetPostsDocument,
  useGetUserQuery,
  useMeQuery,
  User,
  useToggleFollowMutation,
} from '@/generated/graphql';

const useToggleFollowHook = (user: User) => {
  const { setMessage } = useMessageCtx();
  const [toggleFollow, { loading: toggling }] = useToggleFollowMutation();
  const { data: meData } = useMeQuery();
  const me = meData!.me!;
  const { data: followUser } = useGetUserQuery({
    variables: { username: user?.username },
    skip: !user?.username,
    fetchPolicy: 'cache-only',
  });
  const { data: currentUser } = useGetUserQuery({
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
            { query: GetExplorePostsDocument, variables: { limit: 12 } },
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
              // Update followers array
              if (followUser?.getUser?.profile) {
                cache.modify({
                  id: cache.identify(followUser?.getUser?.profile),
                  broadcast: false,
                  fields: {
                    followers(existingFollowersRefs = [], { readField }) {
                      if (!isFollowing) {
                        const newFollowerRef = cache.identify(me);

                        // Quick safety check - if the new follower is already
                        // present in the cache, we don't need to add it again.
                        if (
                          existingFollowersRefs.some(
                            (ref: any) => readField('id', ref) === me.id
                          )
                        ) {
                          return existingFollowersRefs;
                        }

                        return [newFollowerRef, ...existingFollowersRefs];
                      } else {
                        return existingFollowersRefs.filter(
                          (ref: any) => readField('id', ref) !== me.id
                        );
                      }
                    },
                  },
                });
              }

              if (currentUser?.getUser?.profile) {
                // update followings array
                cache.modify({
                  id: cache.identify(currentUser?.getUser?.profile),
                  broadcast: false,
                  fields: {
                    followings(existingFollowingsRefs = [], { readField }) {
                      if (!isFollowing) {
                        const newFollowingRef = cache.identify(user);

                        // Quick safety check - if the new following is already
                        // present in the cache, we don't need to add it again.
                        if (
                          existingFollowingsRefs.some(
                            (ref: any) => readField('id', ref) === user.id
                          )
                        ) {
                          return existingFollowingsRefs;
                        }

                        return [newFollowingRef, ...existingFollowingsRefs];
                      } else {
                        return existingFollowingsRefs.filter(
                          (ref: any) => readField('id', ref) !== user.id
                        );
                      }
                    },
                  },
                });
              }

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
