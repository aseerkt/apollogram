import { AuthenticationError } from 'apollo-server-express';
import { validate } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Comment } from '../entities/Comment';
// import { Follow } from '../entities/Follow';
import { Like } from '../entities/Like';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { FieldError, MyContext } from '../types';
import { formatErrors } from '../utils/formatErrors';
import { uploadFile } from '../utils/uploadFile';

@ObjectType()
class CreatePostResponse {
  @Field()
  ok: boolean;
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User)
  user(@Root() post: Post, @Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(post.username);
  }

  @FieldResolver(() => Int)
  likeCount(@Root() post: Post): Promise<number> {
    return Like.count({ where: { postId: post.id } });
  }

  @FieldResolver(() => Boolean)
  async userLike(@Root() post: Post, @Ctx() { req }: MyContext) {
    const like = await Like.findOne({
      where: { postId: post.id, username: req.session.username },
    });
    return like ? true : false;
  }

  @FieldResolver(() => [Comment])
  comments(@Root() post: Post): Promise<Comment[]> {
    return Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => [Post])
  @UseMiddleware(isAuth)
  getPosts() {
    // TODO: Pagination
    return Post.find({
      order: { createdAt: 'DESC' },
    });
  }

  // @Query(() => [Post])
  // @UseMiddleware(isAuth)
  // async getFeedPosts(@Ctx() { req }: MyContext) {
  //   const followings = await Follow.find({
  //     where: { username: req.session.username },
  //     select: ['following'],
  //     relations: ['following.posts'],
  //   });
  //   const feedPosts: Post[] = [];
  //   followings.forEach((f) => {
  //     feedPosts.push(...f.following.posts);
  //   });
  //   return feedPosts;
  // }

  @Query(() => Post, { nullable: true })
  getSinglePost(@Arg('postId') postId: string) {
    return Post.findOne({
      where: { id: postId },
    });
  }

  @Mutation(() => CreatePostResponse)
  async addPost(
    @Arg('caption') caption: string,
    @Ctx() { req }: MyContext,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload
  ): Promise<CreatePostResponse> {
    const user = await User.findOne({ username: req.session.username });
    if (!user) {
      throw new AuthenticationError('Unauthorized');
    }
    const { isUploaded, imgURL } = await uploadFile(file, 'posts');
    if (isUploaded) {
      const post = Post.create({ caption, imgURL, user });
      const errors = await validate(post);
      if (errors.length > 0) {
        return { ok: false, error: formatErrors(errors)[0] };
      }
      await post.save();
      return { ok: true, post };
    }
    return { ok: false, error: { path: 'file', message: 'File Upload Fail' } };
  }
}
/*
 * curl 'http://localhost:5000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:5000' --data-binary '{"query":"mutation AddPost($file: Upload!){\n  addPost(file)\n}"}' --compressed
 *
 */
