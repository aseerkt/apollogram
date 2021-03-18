import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const { username } = req.session;
  if (!username) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }

  const user = await User.findOne({ username });
  if (!user) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }
  return next();
};
