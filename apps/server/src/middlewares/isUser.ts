import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types.js';
import { getUserFromToken } from '../utils/checkUserFromCookie.js';

export const isUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await getUserFromToken(context.req);
  } catch (err) {
    console.log(err);
  }
  return next();
};
