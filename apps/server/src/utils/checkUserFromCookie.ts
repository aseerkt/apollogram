import { AuthenticationError } from 'apollo-server-express';
import { COOKIE_NAME } from '../constants';
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

  req.username = username;
  return { username };
};
