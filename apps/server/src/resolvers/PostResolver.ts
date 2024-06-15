import { validate } from 'class-validator'
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
} from 'type-graphql'
import { CLOUDINARY_ROOT_PATH } from '../constants.js'
import { Comment } from '../entities/Comment.js'
import { Post } from '../entities/Post.js'
import { User } from '../entities/User.js'
import { isAuth } from '../middlewares/isAuth.js'
import {
  CloudinaryUploadResult,
  EnumFilePathPrefix,
  FieldError,
  type MyContext,
} from '../types.js'
import { PaginatedPost } from '../types/postTypes.js'
import {
  deleteCloudinaryFile,
  generateUrl,
  verifySignature,
} from '../utils/cloudinary.js'
import { formatErrors } from '../utils/formatErrors.js'

@ObjectType()
class CreatePostResponse {
  @Field()
  ok: boolean

  @Field(() => Post, { nullable: true })
  post?: Post

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User)
  user(@Root() post: Post, @Ctx() { loader }: MyContext): Promise<User> {
    return loader.user.load(post.author.id)
  }

  @FieldResolver(() => Boolean)
  async userLike(
    @Root() post: Post,
    @Ctx() { req, loader }: MyContext
  ): Promise<boolean> {
    if (!req.userId) return false
    const like = await loader.like.load({
      postId: post.id,
      userId: req.userId,
    })
    return like ? true : false
  }

  @FieldResolver(() => [Comment])
  async comments(
    @Root() post: Post,
    @Ctx() { em }: MyContext
  ): Promise<Comment[]> {
    return await em.find(Comment, { post: post.id })
  }

  @FieldResolver(() => String)
  imgURL(@Root() post: Post): string {
    if (post.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
      return generateUrl(post.imgURL, EnumFilePathPrefix.POSTS)
    }
    return post.imgURL
  }

  // Feed posts
  @Query(() => PaginatedPost)
  @UseMiddleware(isAuth)
  async getPosts(
    @Ctx() { req, em }: MyContext,
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0, nullable: true })
    offset?: number
  ): Promise<PaginatedPost> {
    const params = [req.userId, limit + 1]
    if (offset) params.push(offset)
    // Get posts from followed peoples only
    const posts = await em
      .createQueryBuilder(Post, 'p')
      .select('p.*')
      .innerJoin('follows', 'f', { 'f.followingUserId': 'p.authorId' })
      .where({ 'f.userId': req.userId })
      .orderBy({ createdAt: 'DESC' })
      .limit(limit + 1)
      .offset(offset)

    return {
      posts: posts.slice(0, limit),
      hasMore: posts.length === limit + 1,
    }
  }

  @Query(() => PaginatedPost)
  @UseMiddleware(isAuth)
  async getExplorePosts(
    @Ctx() { em }: MyContext,
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int, { nullable: true }) offset?: number
  ): Promise<PaginatedPost> {
    const posts = await em.find(
      Post,
      {},
      {
        limit: limit + 1,
        offset: offset ?? 0,
        orderBy: { createdAt: 'desc' },
      }
    )

    return {
      posts: posts.slice(0, limit),
      hasMore: posts.length === limit + 1,
    }
  }

  @Query(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  getSinglePost(@Arg('postId') postId: number, @Ctx() { em }: MyContext) {
    return em.findOne(Post, postId)
  }

  @Mutation(() => CreatePostResponse)
  @UseMiddleware(isAuth)
  async addPost(
    @Arg('uploadResult') uploadResult: CloudinaryUploadResult,
    @Arg('caption') caption: string,
    @Ctx() { req, em }: MyContext
  ): Promise<CreatePostResponse> {
    verifySignature(uploadResult)

    if (uploadResult.publicId) {
      const post = em.create(Post, {
        caption,
        imgURL: uploadResult.publicId,
        author: req.userId!,
      })
      const errors = await validate(post)
      if (errors.length > 0) {
        return { ok: false, error: formatErrors(errors)[0] }
      }
      await em.persist(post).flush()
      return { ok: true, post }
    }
    return { ok: false, error: { path: 'file', message: 'File upload failed' } }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { req, em }: MyContext
  ) {
    try {
      const post = await em.findOne(Post, postId)
      if (!post || post.author.id !== req.userId) return false
      if (post.imgURL.startsWith(CLOUDINARY_ROOT_PATH)) {
        const isImageDeleted = await deleteCloudinaryFile(post.imgURL)
        if (!isImageDeleted) return false
      }
      await em.remove(post).flush()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async editCaption(
    @Arg('postId', () => ID) postId: number,
    @Arg('caption') caption: string,
    @Ctx() { req, em }: MyContext
  ) {
    try {
      const post = await em.findOne(Post, postId)

      if (!post || post.author.id !== req.userId) {
        return null
      }

      post.caption = caption
      await em.flush()
      return caption
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
