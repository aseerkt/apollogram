import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Like } from '../entities/Like';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver()
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLike(
    @Arg('postId') postId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      let like = await Like.findOne({
        where: { postId, username: req.session.username },
      });
      if (!like) {
        await Like.create({ postId, username: req.session.username }).save();
        return true;
      } else {
        await like.remove();
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
