import { MyContext } from '../types.js'
import { verifyToken } from './tokenHandler.js'

export const getUserFromToken = async (req: MyContext['req']) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    throw new Error('Unauthorized')
  }
  const { userId }: any = verifyToken(token)

  if (!userId) {
    throw new Error('Unauthorized')
  }

  req.userId = userId
  return { userId }
}
