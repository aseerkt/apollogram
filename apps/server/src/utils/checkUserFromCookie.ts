import { MyContext } from '../types';
import { verifyToken } from './tokenHandler';

export const checkUserFromCookie = async ({ req }: MyContext) => {
  // TODO: fix token fetch
  const token = '';
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
