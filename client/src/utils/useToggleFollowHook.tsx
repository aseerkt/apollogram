import { gql } from '@apollo/client';
import { useCallback } from 'react';
import {
  useMeQuery,
  User,
  useToggleFollowMutation,
} from '../generated/graphql';

const useToggleFollowHook = (user?: User) => {
  const [toggleFollow, { loading: toggling }] = useToggleFollowMutation();
  const { data: meData } = useMeQuery({ fetchPolicy: 'cache-only' });
  const me = meData!.me!;

  const onToggle = useCallback(
    (user?: User) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!user) return;
      try {
        const {
          id: userId,
          username,
          isFollowing,
          profile: { id: profileId, followersCount },
        } = user;

        await toggleFollow({
          variables: { followingUsername: username },
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
              // Update followers count for selected user
              cache.writeFragment<{ followersCount: number }>({
                fragment: gql`
                  fragment FollowersCount on Profile {
                    followersCount
                  }
                `,
                id: 'Profile:' + profileId,
                data: {
                  followersCount: followersCount + (isFollowing ? -1 : 1),
                },
                broadcast: false,
              });
              // Update followings count for current user
              cache.writeFragment<{ followingsCount: number }>({
                fragment: gql`
                  fragment FollowingsCount on Profile {
                    followingsCount
                  }
                `,
                id: 'Profile:' + me.profile.id,
                data: {
                  followingsCount:
                    me.profile.followingsCount + (isFollowing ? -1 : +1),
                },
                broadcast: false,
              });
            }
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return { toggling, onToggle: onToggle(user) };
};

export default useToggleFollowHook;
