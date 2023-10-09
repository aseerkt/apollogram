import { MyContext } from '../types';
import { verifyToken } from './tokenHandler';

export const getUserFromToken = async ({ req }: MyContext) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

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
