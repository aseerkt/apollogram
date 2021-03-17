import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Like } from '../entities/Like';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver()
export class LikeResolver {
  @Query(() => [Like])
  getLikes(@Arg('postId') postId: string) {
    return Like.find({ where: { postId }, relations: ['user'] });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLike(
    @Arg('postId') postId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    let like = await Like.findOne({
      where: { postId, userId: req.session.userId },
    });
    if (!like) {
      await Like.create({ postId, userId: req.session.userId }).save();
      return true;
    } else {
      await like.remove();
      return true;
    }
  }
}
