import { AuthenticationError } from 'apollo-server-express';
import { COOKIE_NAME } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { verifyToken } from './tokenHandler';

export const checkUserFromCookie = async ({ req, res }: MyContext) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }
  const { username }: any = verifyToken(token);

  if (!username) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }
  const user = await User.findOne({ username });
  if (!user) {
    console.log('Something is wrong');
    throw new AuthenticationError('Unauthorized');
  }
  res.locals.username = username;
  return { user };
};
