import {
  Arg,
  Ctx,
  Mutation,
  Query,
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

  @Query(() => [Comment])
  getComments(@Arg('postId') postId: string) {
    return Comment.find({ where: { postId } });
  }

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isAuth)
  async addComment(
    @Arg('postId') postId: string,
    @Arg('text') text: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const comment = await Comment.create({
        postId,
        text,
        username: req.session.username,
      }).save();
      return comment;
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
    try {
      await Comment.delete({
        username: req.session.username,
        id: commentId,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
