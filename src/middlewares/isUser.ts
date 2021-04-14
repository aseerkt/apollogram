import { MiddlewareFn } from 'type-graphql';
import { COOKIE_NAME } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { verifyToken } from '../utils/tokenHandler';

export const isUser: MiddlewareFn<MyContext> = async (
  { context: { req, res } },
  next
) => {
  const token = req.cookies[COOKIE_NAME];
  console.log({ token });
  if (!token) {
    console.log('No token');
  }
  const { username }: any = verifyToken(token);

  if (!username) {
    console.log('No username');
  }
  const user = await User.findOne({ username });
  if (!user) {
    console.log('No user');
  }
  res.locals.username = username;
  return next();
};
