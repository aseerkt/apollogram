import 'reflect-metadata';
import 'dotenv/config';
import 'colors';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import MongoStore from 'connect-mongo';
// import passport from 'passport';
import { COOKIE_NAME, __prod__ } from './constants';
import { createUserLoader } from './utils/createUserLoader';
import { createProfileLoader } from './utils/createProfileLoader';

const sessionStore = __prod__
  ? new MongoStore({ mongoUrl: process.env.MONGO_URI })
  : new (connectRedis(session))({
      client: createClient(),
      disableTouch: true,
    });

const main = async () => {
  await createConnection();

  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get('/', (_, res) =>
    res.send('Welcome to Backend Server of Apollo Instagram Clone')
  );
  app.use('/', express.static('public'));
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.set('trust proxy', 1);
  app.use(
    session({
      name: COOKIE_NAME,
      store: sessionStore,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: __prod__,
        sameSite: __prod__ ? 'none' : 'lax',
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
