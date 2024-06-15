import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'
import { Comment } from '../entities/Comment.js'

export const createCommentLoader = (em: EntityManager) =>
  new DataLoader<number, Comment[]>(async (postIds) => {
    // Fetch comments for the given postIds
    const comments = await em.find(
      Comment,
      {
        post: { $in: postIds as number[] },
      },
      {
        orderBy: { createdAt: 'DESC' },
      }
    )

    // Initialize a Map to store comments by post ID
    const commentsForPost = new Map<number, Comment[]>()

    comments.forEach((comment) => {
      const postId = comment.post.id
      if (!commentsForPost.has(postId)) {
        commentsForPost.set(postId, [])
      }
      commentsForPost.get(postId)!.push(comment)
    })

    // Map the results back to the order of input postIds
    return postIds.map((id) => commentsForPost.get(id) || [])
  })
