import DataLoader from 'dataloader';
import { Profile } from '../entities/Profile';
import { AppDataSource } from '../data-source';

export const createProfileLoader = () =>
  new DataLoader<string, Profile>(async (usernames) => {
    const profiles = await AppDataSource.manager
      .createQueryBuilder(Profile, 'profile')
      .where('profile.username IN (:...usernames)', { usernames })
      .getMany();

    const usernameToProfile: Record<string, Profile> = {};
    profiles.forEach((u) => {
      usernameToProfile[u.username] = u;
    });
    return usernames.map((username) => usernameToProfile[username]);
  });
