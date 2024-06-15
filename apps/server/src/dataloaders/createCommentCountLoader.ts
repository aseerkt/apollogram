import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'

export const createCommentCountLoader = (em: EntityManager) =>
  new DataLoader<number, number>(async (postIds) => {
    // Fetch comment counts for the provided postIds

    const comments = await em.getConnection().execute(`
      SELECT post_id, COUNT(*) as comment_count 
      FROM "comments" 
      WHERE post_id IN (${postIds.join(',')}) 
      GROUP BY post_id
    `)

    // Create a map to store like counts
    const commentCountMap = new Map()
    comments.forEach((like) => {
      commentCountMap.set(like.post_id, parseInt(like.comment_count, 10))
    })

    // Map the results back to the order of input postIds
    return postIds.map((postId) => commentCountMap.get(postId) || 0)
  })
