import DataLoader from 'dataloader';
import { Follow } from '../entities/Follow';
import { getRepository } from 'typeorm';

interface FollowLoaderData {
  username: string;
  state: 'follower' | 'following';
}

export const createFollowLoader = () =>
  new DataLoader<string, FollowLoaderData[]>(async (usernames) => {
    const follows = await getRepository(Follow)
      .createQueryBuilder('f')
      .where('username IN (:...usernames)', { usernames })
      .orWhere('"followingUsername" IN (:...usernames)', { usernames })
      .getMany();
    const usersToFollowerData: Record<string, FollowLoaderData[]> = {};

    follows.forEach((f) => {
      usersToFollowerData[f.username] = (
        usersToFollowerData[f.username] || []
      ).concat({ username: f.followingUsername, state: 'following' });

      usersToFollowerData[f.followingUsername] = (
        usersToFollowerData[f.followingUsername] || []
      ).concat({ username: f.username, state: 'follower' });
    });

    return usernames.map((username) => usersToFollowerData[username]);
  });
