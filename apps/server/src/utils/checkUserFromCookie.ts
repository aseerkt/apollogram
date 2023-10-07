import { MyContext } from '../types';
import { verifyToken } from './tokenHandler';

export const checkUserFromCookie = async ({ req }: MyContext) => {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) {
    console.log('Something is wrong');
    throw new Error('Unauthorized');
  }
  const { username }: any = verifyToken(token);

  if (!username) {
    console.log('Something is wrong');
    throw new Error('Unauthorized');
  }

  req.username = username;
  return { username };
};
