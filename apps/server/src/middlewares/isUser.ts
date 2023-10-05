import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
import { checkUserFromCookie } from '../utils/checkUserFromCookie';

export const isUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await checkUserFromCookie(context);
  } catch (err) {
    console.log(err);
  }
  return next();
};
