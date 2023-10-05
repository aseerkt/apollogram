import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { createUserLoader } from './dataloaders/createUserLoader';
import { createProfileLoader } from './dataloaders/createProfileLoader';
import { __prod__ } from './constants';
import { MyContext } from './types';
import { createCommentLoader } from './dataloaders/createCommentLoader';
import { createLikeLoader } from './dataloaders/createLikeLoader';
import { createFollowLoader } from './dataloaders/createFollowLoader';

async function createGQLServer() {
  // app.get('/', (_, res) => res.send('Welcome to Apollo Instagram API'));

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
  });

  const yoga = createYoga({
    schema,
    cors: { credentials: true, origin: 'http://localhost:3000' },
    context: ({ request }) =>
      ({
        req: request,
        userLoader: createUserLoader(),
        profileLoader: createProfileLoader(),
        commentLoader: createCommentLoader(),
        likeLoader: createLikeLoader(),
        followLoader: createFollowLoader(),
      } as MyContext),
  });

  const httpServer = createServer(yoga);

  return { server: httpServer };
}

export default createGQLServer;
