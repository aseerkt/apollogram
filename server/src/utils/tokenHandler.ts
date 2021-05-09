import { Response } from 'express';
import { COOKIE_NAME, __prod__ } from '../constants';
import { User } from '../entities/User';
import { sign, verify } from 'jsonwebtoken';

export const createTokenCookie = (user: User, res: Response) => {
  res.cookie(
    COOKIE_NAME,
    sign({ username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    }),
    {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: __prod__,
    }
  );
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};
