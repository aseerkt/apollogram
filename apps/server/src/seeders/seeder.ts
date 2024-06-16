import { faker } from '@faker-js/faker'
import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { hash } from 'argon2'
import 'colors'
import 'dotenv/config'
import { Post } from '../entities/Post.js'
import { Profile } from '../entities/Profile.js'
import { User } from '../entities/User.js'

const USER_PASSWORD = 'bob@123'
const USER_COUNT = 1000
const POST_PER_USER_COUNT = 50

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    // await connection.dropDatabase()
    // await connection.synchronize()

    // setupCloundinary()
    // await cloudinary.api.delete_resources_by_prefix(CLOUDINARY_ROOT_PATH)

    const users: Partial<User>[] = []

    for (let i = 0; i < USER_COUNT; i++) {
      users.push({
        username: faker.internet.userName().toLowerCase(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        imgURL: faker.image.avatar(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        password: await hash(USER_PASSWORD),
      })
    }

    const upsertedUsers = await em.upsertMany(User, users)

    const profiles: Partial<Profile>[] = []
    const posts: Partial<Post>[] = []

    for (const user of upsertedUsers) {
      profiles.push({
        user: em.getReference(User, user.id),
        bio: faker.person.bio(),
        website: faker.internet.url(),
        gender: faker.helpers.arrayElement([
          'Male',
          'Female',
          'Prefer not to say',
        ]),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      })

      for (let i = 0; i < POST_PER_USER_COUNT; i++) {
        posts.push({
          caption: faker.lorem.word(),
          imgURL: faker.image.urlPicsumPhotos(),
          createdAt: faker.date.anytime(),
          updatedAt: faker.date.anytime(),
          author: em.getReference(User, user.id),
        })
      }
    }

    await em.upsertMany(Profile, profiles)
    await em.insertMany(Post, posts)
  }
}
