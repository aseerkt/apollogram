import DataLoader from 'dataloader';
import { getManager } from 'typeorm';
import { User } from '../entities/User';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (usernames) => {
    const users = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.username IN (:...usernames)', { usernames })
      .getMany();

    const usernameToUser: Record<string, User> = {};
    users.forEach((u) => {
      usernameToUser[u.username] = u;
    });

    return usernames.map((username) => usernameToUser[username]);
  });
