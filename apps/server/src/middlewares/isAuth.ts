import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types.js';
import { getUserFromToken } from '../utils/checkUserFromCookie.js';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await getUserFromToken(context.req);
    return next();
  } catch (err) {
    throw err;
  }
};
