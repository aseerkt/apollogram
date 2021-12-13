import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Like } from '../entities/Like';
import { Post } from '../entities/Post';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver()
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLike(
    @Arg('postId') postId: string,
    @Ctx() { res, likeLoader }: MyContext
  ): Promise<boolean> {
    try {
      const post = await Post.findOne({
        where: { id: postId },
        select: ['id', 'likeCount'],
      });
      if (!post) return false;
      let like = await Like.findOne({
        where: { postId, username: res.locals.username },
      });
      if (!like) {
        await Like.create({ postId, username: res.locals.username }).save();
        post.likeCount += 1;
      } else {
        await like.remove();
        post.likeCount -= 1;
      }
      await post.save();
      likeLoader.clear({
        postId: post.id,
        username: res.locals.username,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
