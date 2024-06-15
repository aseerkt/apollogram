import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Follow } from '../entities/Follow.js'
import { User } from '../entities/User.js'

export const createFollowLoader = (em: EntityManager) =>
  new DataLoader<{ followerId: number; followingId: number }, boolean>(
    async (keys) => {
      const follows = await em.find(
        Follow,
        {
          follower: keys.map((key) => em.getReference(User, key.followerId)),
          following: keys.map((key) => em.getReference(User, key.followingId)),
        },
        { fields: ['follower', 'following'] }
      )

      const userFollowData: Record<string, boolean> = {}

      follows.forEach(
        (f) => (userFollowData[`${f.follower.id}|${f.following.id}`] = true)
      )

      return keys.map(
        (key) => userFollowData[`${key.followerId}|${key.followingId}`]
      )
    }
  )
