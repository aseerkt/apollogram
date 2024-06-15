import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Comment } from '../entities/Comment.js'

export const createCommentLoader = (em: EntityManager) =>
  new DataLoader<number, Comment[]>(async function (postIds) {
    const comments = await em.find(
      Comment,
      {
        post: postIds as number[],
      },
      {
        orderBy: { createdAt: 'DESC' },
      }
    )

    const commentsForPost: Record<string, Comment[]> = {}

    comments.forEach((c) => {
      commentsForPost[c.post.id] = (commentsForPost[c.post.id] || []).concat(c)
    })

    return postIds.map((id) => commentsForPost[id] || [])
  })
