import 'reflect-metadata';
import 'dotenv/config';
import 'colors';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { createClient } from 'redis';
// import passport from 'passport';
import { COOKIE_NAME, __prod__ } from './constants';
import { createUserLoader } from './utils/createUserLoader';
import { createProfileLoader } from './utils/createProfileLoader';

const RedisStore = connectRedis(session);
const redisClient = createClient();

const main = async () => {
  await createConnection();

  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use('/', express.static('public'));
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'none',
      },
      secret: __prod__ ? process.env.SESSION_SECRET! : 'secretForYa',
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      profileLoader: createProfileLoader(),
    }),
    uploads: false,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Graph API is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
        .blue.bold
    );
  });
};

main().catch((err) => console.log('Root Error: ', err));
