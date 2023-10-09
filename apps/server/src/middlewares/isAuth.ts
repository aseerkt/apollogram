import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
import { getUserFromToken } from '../utils/checkUserFromCookie';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await getUserFromToken(context);
    return next();
  } catch (err) {
    throw err;
  }
};
