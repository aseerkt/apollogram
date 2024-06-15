import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Like } from '../entities/Like.js'
import { isAuth } from '../middlewares/isAuth.js'
import { type MyContext } from '../types.js'

@Resolver()
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLike(
    @Arg('postId') postId: number,
    @Ctx() { req, em, loader }: MyContext
  ): Promise<boolean> {
    try {
      let like = await em.findOne(Like, {
        post: postId,
        user: req.userId!,
      })
      if (!like) {
        like = em.create(Like, {
          post: postId,
          user: req.userId!,
        })
        em.persist(like)
      } else {
        em.remove(like)
      }
      await em.flush()
      loader.like.clear({
        postId: postId,
        userId: req.userId!,
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
