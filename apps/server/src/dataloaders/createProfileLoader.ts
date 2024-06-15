import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Profile } from '../entities/Profile.js'

export const createProfileLoader = (em: EntityManager) =>
  new DataLoader<number, Profile | undefined>(async (userIds) => {
    const profiles = await em.find(Profile, {
      user: { $in: userIds as number[] },
    })

    const userIdToProfile = new Map<number, Profile>()
    profiles.forEach((profile) => {
      userIdToProfile.set(profile.user.id, profile)
    })

    return userIds.map((userId) => userIdToProfile.get(userId))
  })
