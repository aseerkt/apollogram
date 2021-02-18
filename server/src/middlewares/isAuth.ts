import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const { userId } = req.session;
  if (!userId) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }

  const user = await User.findOne({ id: userId });
  if (!user) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }
  return next();
};
