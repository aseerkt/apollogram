import DataLoader from 'dataloader';
import { getManager } from 'typeorm';
import { Profile } from '../entities/Profile';

export const createProfileLoader = () =>
  new DataLoader<string, Profile>(async (usernames) => {
    const profiles = await getManager()
      .createQueryBuilder(Profile, 'profile')
      .where('profile.username IN (:...usernames)', { usernames })
      .getMany();

    const usernameToProfile: Record<string, Profile> = {};
    profiles.forEach((u) => {
      usernameToProfile[u.username] = u;
    });
    // console.log(usernameToProfile);
    return usernames.map((username) => usernameToProfile[username]);
  });
