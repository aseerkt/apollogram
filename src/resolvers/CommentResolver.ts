import {
  Arg,
  Ctx,
  Mutation,
  Query,
  UseMiddleware,
  Resolver,
} from 'type-graphql';
import { Comment } from '../entities/Comment';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  getComments(@Arg('postId') postId: string) {
    return Comment.find({ where: { postId }, relations: ['user'] });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg('postId') postId: string,
    @Arg('text') text: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      await Comment.create({ postId, text, userId: req.session.userId }).save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('commentId') commentId: string,
    @Ctx() { req }: MyContext
  ) {
    const comment = await Comment.findOne(commentId);
    if (comment?.userId === req.session.userId) {
      await comment.remove();
      return true;
    }
    return false;
  }
}
