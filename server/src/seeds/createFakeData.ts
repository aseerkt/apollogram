import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { User } from '../entities/User';
import fakeUserData from './userData.json';
import profileData from './profileData.json';
import postData from './postData.json';
import { Profile } from '../entities/Profile';
import { hash } from 'argon2';
import 'dotenv/config';
import { Post } from '../entities/Post';

let hashedUserData: any[] = [];

fakeUserData.forEach(async (u) => {
  hashedUserData.push({ ...u, password: await hash('bob123') });
});

export default class CreateMockData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    await connection.dropDatabase();
    await connection.synchronize();

    // Create 3 User

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(hashedUserData)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Profile)
      .values(profileData as any)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(postData as any)
      .execute();
  }
}
