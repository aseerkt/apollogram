import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { Comment } from '../entities/Comment.js'
import { User } from '../entities/User.js'
import { isAuth } from '../middlewares/isAuth.js'
import { type MyContext } from '../types.js'

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User)
  user(@Root() comment: Comment, @Ctx() { loader }: MyContext): Promise<User> {
    return loader.user.load(comment.author.id)
  }

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isAuth)
  async addComment(
    @Arg('postId', () => ID) postId: number,
    @Arg('text') text: string,
    @Ctx() { req, em }: MyContext
  ) {
    try {
      const comment = em.create(Comment, {
        post: postId,
        text,
        author: req.userId!,
      })
      await em.persist(comment).flush()

      // commentLoader.clear(postId)
      return comment
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
