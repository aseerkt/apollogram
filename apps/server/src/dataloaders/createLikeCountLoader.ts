import { EntityManager } from '@mikro-orm/postgresql'
import DataLoader from 'dataloader'

export const createLikeCountLoader = (em: EntityManager) =>
  new DataLoader<number, number>(async (postIds) => {
    // Fetch like counts for the provided postIds

    const likes = await em.getConnection().execute(`
      SELECT post_id, COUNT(*) as like_count 
      FROM "likes" 
      WHERE post_id IN (${postIds.join(',')}) 
      GROUP BY post_id
    `)

    // Create a map to store like counts
    const likeCountMap = new Map()
    likes.forEach((like) => {
      likeCountMap.set(like.post_id, parseInt(like.like_count, 10))
    })

    // Map the results back to the order of input postIds
    return postIds.map((postId) => likeCountMap.get(postId) || 0)
  })
