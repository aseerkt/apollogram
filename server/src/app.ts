import http from 'http';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import cookieParser from 'cookie-parser';
import { createUserLoader } from './dataloaders/createUserLoader';
import { createProfileLoader } from './dataloaders/createProfileLoader';
import { FRONTEND_URL, __prod__ } from './constants';
import { MyContext } from './types';
import { createCommentLoader } from './dataloaders/createCommentLoader';
import { createLikeLoader } from './dataloaders/createLikeLoader';
import { createFollowLoader } from './dataloaders/createFollowLoader';

async function createServer() {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'HEAD'],
      maxAge: 600,
    })
  );

  app.get('/', (_, res) => res.send('Welcome to Apollo Instagram API'));

  app.use(cookieParser());

  app.use('/', express.static('public'));
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
    }),
    context: ({ req, res }) =>
      ({
        req,
        res,
        userLoader: createUserLoader(),
        profileLoader: createProfileLoader(),
        commentLoader: createCommentLoader(),
        likeLoader: createLikeLoader(),
        followLoader: createFollowLoader(),
      } as MyContext),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      __prod__
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });
  return { server: httpServer };
}

export default createServer;
