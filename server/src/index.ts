import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { COOKIE_NAME, __prod__ } from './constants';
import imagesRoute from './routes/imageRoute';
import uploadRoute from './routes/uploadFile';

const main = async () => {
  await createConnection();

  const app = express();

  app.use(
    cors({
      origin: __prod__ ? process.env.FRONTEND_URL : 'http://localhost:3000',
      credentials: true,
    })
  );

  // app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use('/images', imagesRoute);
  app.use('/upload', uploadRoute);

  const RedisStore = connectRedis(session);
  const redisClient = createClient();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
      secret: __prod__ ? process.env.SESSION_SECRET! : 'secretForYa',
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/**/**.{ts,js}'],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Graph API is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => console.log('Root Error: ', err));
