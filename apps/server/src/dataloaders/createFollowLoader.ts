import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Follow } from '../entities/Follow.js'

export const createFollowLoader = (em: EntityManager) =>
  new DataLoader<{ followerId: number; followingId: number }, boolean>(
    async (keys) => {
      const followerIds = keys.map((key) => key.followerId)
      const followingIds = keys.map((key) => key.followingId)

      const follows = await em.find(
        Follow,
        {
          follower: { $in: followerIds },
          following: { $in: followingIds },
        },
        {
          fields: ['follower', 'following'],
        }
      )

      const userFollowData = new Map<string, boolean>()

      follows.forEach((f) => {
        userFollowData.set(`${f.follower.id}|${f.following.id}`, true)
      })

      return keys.map(
        (key) =>
          userFollowData.get(`${key.followerId}|${key.followingId}`) || false
      )
    }
  )
