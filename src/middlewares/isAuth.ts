import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
import { checkUserFromCookie } from '../utils/checkUserFromCookie';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await checkUserFromCookie(context);
    return next();
  } catch (err) {
    throw err;
  }
};
