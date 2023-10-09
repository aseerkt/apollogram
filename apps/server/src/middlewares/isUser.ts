import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
import { getUserFromToken } from '../utils/checkUserFromCookie';

export const isUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await getUserFromToken(context);
  } catch (err) {
    console.log(err);
  }
  return next();
};
