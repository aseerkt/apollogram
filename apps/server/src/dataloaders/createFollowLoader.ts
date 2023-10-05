import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Follow } from '../entities/Follow';

export const createFollowLoader = () =>
  new DataLoader<{ username: string; followingUsername: string }, boolean>(
    async (keys) => {
      const follows = await Follow.find({
        where: {
          username: In(keys.map((key) => key.username)),
          followingUsername: In(keys.map((key) => key.followingUsername)),
        },
        select: ['followingUsername', 'username'],
      });

      const userFollowData: Record<string, boolean> = {};

      follows.forEach(
        (f) => (userFollowData[`${f.username}|${f.followingUsername}`] = true)
      );

      return keys.map(
        (key) => userFollowData[`${key.username}|${key.followingUsername}`]
      );
    }
  );
