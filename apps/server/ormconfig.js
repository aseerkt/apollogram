require('dotenv').config();

const __prod__ = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: __prod__
    ? {
        rejectUnauthorized: false,
      }
    : false,
  synchronize: false,
  logging: !__prod__,
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  subscribers: ['dist/subscribers/**/*.js'],
  seeds: ['dist/seeds/**/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
