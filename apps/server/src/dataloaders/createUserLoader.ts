import DataLoader from 'dataloader';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (usernames) => {
    const users = await AppDataSource.manager
      .createQueryBuilder(User, 'user')
      .where('user.username IN (:...usernames)', { usernames })
      .getMany();

    const usernameToUser: Record<string, User> = {};
    users.forEach((u) => {
      usernameToUser[u.username] = u;
    });

    return usernames.map((username) => usernameToUser[username]);
  });
