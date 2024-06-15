import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { User } from '../entities/User.js'

export const createUserLoader = (em: EntityManager) =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await em.find(User, { id: userIds as number[] })

    const userIdToUser: Record<number, User> = {}
    users.forEach((u) => {
      userIdToUser[u.id] = u
    })

    return userIds.map((userId) => userIdToUser[userId])
  })
