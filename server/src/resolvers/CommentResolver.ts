import {
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  Resolver,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Comment } from '../entities/Comment';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User)
  user(
    @Root() comment: Comment,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(comment.username);
  }

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isAuth)
  async addComment(
    @Arg('postId') postId: string,
    @Arg('text') text: string,
    @Ctx() { res, commentLoader }: MyContext
  ) {
    try {
      const newComment = await Comment.create({
        postId,
        text,
        username: res.locals.username,
      }).save();
      commentLoader.clear(postId);
      return newComment;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async deleteComment(
  //   @Arg('commentId') commentId: string,
  //   @Ctx() { res }: MyContext
  // ) {
  //   try {
  //     await Comment.delete({
  //       username: res.locals.username,
  //       id: commentId,
  //     });
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }
}
