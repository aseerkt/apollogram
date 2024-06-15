import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SeedManager } from '@mikro-orm/seeder'
import 'dotenv/config'
import { __prod__ } from './constants.js'

export default defineConfig({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  // entities: [User, Profile, Post, Like, Follow, Comment],
  entities: ['dist/entities/**/*.js'],
  entitiesTs: ['src/entities/**/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: !__prod__,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders'
  },
  extensions: [Migrator, SeedManager],
  // migrations: ['dist/migrations/**/*.js'],
})
