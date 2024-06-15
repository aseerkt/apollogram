import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Like } from '../entities/Like.js'

export const createLikeLoader = (em: EntityManager) =>
  new DataLoader<{ postId: number; userId: number }, boolean>(async function (
    keys
  ) {
    const likes = await em.find(
      Like,
      {
        post: keys.map((key) => key.postId),
        user: keys.map((key) => key.userId),
      },
      {
        fields: ['post', 'user'],
      }
    )

    const likeForPost: Record<string, boolean> = {}

    likes.forEach((like) => {
      likeForPost[`${like.post.id}|${like.user.id}`] = true
    })

    return keys.map((key) => likeForPost[`${key.postId}|${key.userId}`])
  })
