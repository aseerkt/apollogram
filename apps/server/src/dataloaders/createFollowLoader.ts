import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Follow } from '../entities/Follow.js'

export const createFollowLoader = (em: EntityManager) =>
  new DataLoader<{ followerId: number; followingId: number }, boolean>(
    async (keys) => {
      const follows = await em.find(
        Follow,
        {
          $or: keys.map((key) => ({
            follower: key.followerId,
            following: key.followingId,
          })),
        },
        {
          fields: ['follower', 'following'],
        }
      )

      const userFollowData = new Map<string, boolean>()

      follows.forEach((follow) => {
        userFollowData.set(`${follow.follower.id}|${follow.following.id}`, true)
      })

      return keys.map(
        (key) =>
          userFollowData.get(`${key.followerId}|${key.followingId}`) || false
      )
    }
  )
