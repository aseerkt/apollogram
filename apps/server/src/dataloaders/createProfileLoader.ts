import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Profile } from '../entities/Profile.js'

export const createProfileLoader = (em: EntityManager) =>
  new DataLoader<number, Profile>(async (userIds) => {
    const profiles = await em.find(Profile, {
      user: { $in: userIds as number[] },
    })

    const userIdToProfile: Record<number, Profile> = {}
    profiles.forEach((u) => {
      userIdToProfile[u.user.id] = u
    })
    return userIds.map((userId) => userIdToProfile[userId])
  })
