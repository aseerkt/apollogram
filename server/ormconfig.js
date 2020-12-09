const entitiesDir =
  process.env.TS_NODE === 'true'
    ? 'src/entities/**/*.ts'
    : 'dist/entities/**/*.js';

const migrationsDir =
  process.env.TS_NODE === 'true'
    ? 'src/migrations/**/*.ts'
    : 'dist/migrations/**/*.js';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'insta-clone-1',
  synchronize: false,
  logging: false,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
