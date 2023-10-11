import { validate } from 'class-validator';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { CLOUDINARY_ROOT_PATH, __prod__ } from '../constants';
import { Comment } from '../entities/Comment';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import {
  CloudinaryUploadResult,
  EnumFilePathPrefix,
  FieldError,
  MyContext,
} from '../types';
import { PaginatedPost } from '../types/postTypes';
import { formatErrors } from '../utils/formatErrors';
import {
  generateUrl,
  deleteCloudinaryFile,
  verifySignature,
} from '../utils/cloudinary';
import { AppDataSource } from '../data-source';

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

  @FieldResolver(() => Boolean)
  async userLike(
    @Root() post: Post,
    @Ctx() { req, likeLoader }: MyContext
  ): Promise<boolean> {
    if (!req.username) return false;
    const like = await likeLoader.load({
      postId: post.id,
      username: req.username,
    });
    return like ? true : false;
  }

  @FieldResolver(() => [Comment])
  async comments(
    @Root() post: Post,
    @Ctx() { commentLoader }: MyContext
  ): Promise<Comment[]> {
    return await commentLoader.load(post.id);
  }

  @FieldResolver(() => String)
  imgURL(@Root() post: Post): string {
    if (post.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
      return generateUrl(post.imgURL, EnumFilePathPrefix.POSTS);
    }
    return post.imgURL;
  }

  // Feed posts
  @Query(() => PaginatedPost)
  @UseMiddleware(isAuth)
  async getPosts(
    @Ctx() { req }: MyContext,
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int, { nullable: true }) offset?: number
  ): Promise<PaginatedPost> {
    const params = [req.username, limit + 1];
    if (offset) params.push(offset);
    // Get posts from followed peoples only
    const posts: Post[] = await AppDataSource.query(
      /*sql*/ `
      SELECT 
        p.* 
      FROM posts p 
      INNER JOIN follows f 
      ON f."followingUsername" = p.username 
      WHERE f.username = $1 
      ORDER BY p."createdAt" DESC 
      LIMIT $2 ${offset ? 'OFFSET $3' : ''};
    `,
      params
    );
    return {
      posts: posts.slice(0, limit),
      hasMore: posts.length === limit + 1,
    };
  }

  @Query(() => PaginatedPost)
  @UseMiddleware(isAuth)
  async getExplorePosts(
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int, { nullable: true }) offset?: number
  ): Promise<PaginatedPost> {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
      skip: offset ? offset : 0,
      take: limit + 1,
    });

    return {
      posts: posts.slice(0, limit),
      hasMore: posts.length === limit + 1,
    };
  }

  @Query(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  getSinglePost(@Arg('postId') postId: string) {
    return Post.findOne({
      where: { id: postId },
    });
  }

  @Mutation(() => CreatePostResponse)
  @UseMiddleware(isAuth)
  async addPost(
    @Arg('uploadResult') uploadResult: CloudinaryUploadResult,
    @Arg('caption') caption: string,
    @Ctx() { req }: MyContext
  ): Promise<CreatePostResponse> {
    verifySignature(uploadResult);

    if (uploadResult.publicId) {
      const post = Post.create({
        caption,
        imgURL: uploadResult.publicId,
        username: req.username,
      });
      const errors = await validate(post);
      if (errors.length > 0) {
        return { ok: false, error: formatErrors(errors)[0] };
      }
      await post.save();
      return { ok: true, post };
    }
    return { ok: false, error: { path: 'file', message: 'File Upload Fail' } };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const post = await Post.findOne({
        where: { id: postId, username: req.username },
      });
      if (!post) return false;
      if (post.imgURL.startsWith(CLOUDINARY_ROOT_PATH)) {
        const isImageDeleted = await deleteCloudinaryFile(post.imgURL);
        if (!isImageDeleted) return false;
      }
      await post.remove();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async editCaption(
    @Arg('postId', () => ID) postId: string,
    @Arg('caption') caption: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const result = await Post.update(
        { id: postId, username: req.username },
        { caption }
      );

      return result.affected && result.affected > 0 ? caption : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
