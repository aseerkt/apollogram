import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Like } from '../entities/Like.js'

export const createLikeLoader = (em: EntityManager) =>
  new DataLoader<{ postId: number; userId: number }, boolean>(async (keys) => {
    const postIds = keys.map((key) => key.postId)
    const userIds = keys.map((key) => key.userId)

    const likes = await em.find(Like, {
      $and: [{ post: { $in: postIds } }, { user: { $in: userIds } }],
    })

    const likeMap = new Map()
    likes.forEach((like) => {
      likeMap.set(`${like.post.id}|${like.user.id}`, true)
    })

    return keys.map(
      (key) => likeMap.get(`${key.postId}|${key.userId}`) || false
    )
  })
