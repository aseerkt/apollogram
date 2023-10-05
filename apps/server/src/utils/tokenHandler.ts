import { __prod__ } from '../constants';
import { User } from '../entities/User';
import { sign, verify } from 'jsonwebtoken';

export const createToken = (user: User) => {
  return sign({ username: user.username }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};
