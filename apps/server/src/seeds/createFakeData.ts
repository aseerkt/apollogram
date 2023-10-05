import 'colors';
import 'dotenv/config';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v2 as cloudinary } from 'cloudinary';
import { User } from '../entities/User';
import fakeUserData from './userData.json';
import profileData from './profileData.json';
import postData from './postData.json';
import { Profile } from '../entities/Profile';
import { hash } from 'argon2';
import 'dotenv/config';
import { Post } from '../entities/Post';
import setupCloundinary from '../config/setupCloundinary';
import { CLOUDINARY_ROOT_PATH, __prod__ } from '../constants';

let hashedUserData: any[] = [];

fakeUserData.forEach(async (u) => {
  hashedUserData.push({ ...u, password: await hash('bob123') });
});

export default class CreateMockData implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection.dropDatabase();
    await connection.synchronize();

    setupCloundinary();

    await cloudinary.api.delete_resources_by_prefix(CLOUDINARY_ROOT_PATH);

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
