import jwt from 'jsonwebtoken'
import { User } from '../entities/User.js'

export const createToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!)
}
