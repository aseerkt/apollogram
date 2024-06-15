import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { User } from '../entities/User.js'

export const createUserLoader = (em: EntityManager) =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await em.find(User, { id: { $in: userIds as number[] } })

    const userIdToUser = new Map<number, User>()
    users.forEach((user) => {
      userIdToUser.set(user.id, user)
    })

    return userIds.map((userId) => userIdToUser.get(userId)!)
  })
