import DataLoader from 'dataloader';
import { User } from '../entities/User';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[]);

    const userIdToUser: Record<string, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    return userIds.map((id) => userIdToUser[id]);
  });
