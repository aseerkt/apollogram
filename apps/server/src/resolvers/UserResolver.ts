import { validate } from 'class-validator'
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { CLOUDINARY_ROOT_PATH, GRAVATAR } from '../constants.js'
import { Post } from '../entities/Post.js'
import { Profile } from '../entities/Profile.js'
import { User } from '../entities/User.js'
import { isUser } from '../middlewares/isUser.js'
import { EnumFilePathPrefix, type MyContext } from '../types.js'
import {
  LoginResponse,
  RegisterResponse,
  RegisterVariables,
} from '../types/userTypes.js'
import { generateUrl } from '../utils/cloudinary.js'
import { formatErrors } from '../utils/formatErrors.js'
import { createToken } from '../utils/tokenHandler.js'

@Resolver(User)
export class UserResolver {
  // Field Resolvers

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext): string {
    if (req.userId === user.id) {
      return user.email
    }
    return ''
  }

  @FieldResolver(() => String)
  imgURL(@Root() user: User): string {
    if (user.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
      return generateUrl(user.imgURL, EnumFilePathPrefix.PROFILES)
    }
    return user.imgURL
  }

  @FieldResolver(() => Profile)
  profile(@Root() user: User, @Ctx() { loader }: MyContext): Promise<Profile> {
    return loader.profile.load(user.id)
  }

  @FieldResolver(() => [Post])
  posts(@Root() user: User, @Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(
      Post,
      {
        author: user.id,
      },
      { orderBy: { createdAt: 'desc' } }
    )
  }

  @FieldResolver(() => Boolean)
  async isFollowing(
    @Root() user: User,
    @Ctx() { req, loader }: MyContext
  ): Promise<boolean> {
    if (!req.userId) return false
    if (req.userId === user.id) return false
    const following = await loader.follow.load({
      followerId: req.userId,
      followingId: user.id,
    })
    return following ? true : false
  }

  // QUERIES

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { req, em }: MyContext) {
    if (!req.userId) return null
    return em.findOne(User, req.userId)
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  getUser(@Arg('username') username: string, @Ctx() { em }: MyContext) {
    return em.findOne(User, { username })
  }

  // Register

  @Mutation(() => RegisterResponse)
  async register(
    @Args() { email, username, password }: RegisterVariables,
    @Ctx() { em }: MyContext
  ): Promise<RegisterResponse> {
    const existingUser = await em.findOne(User, {
      $or: [{ email }, { username }],
    })
    if (existingUser)
      return {
        ok: false,
        errors: [
          {
            path: 'unknown',
            message: 'Email / Username already taken',
          },
        ],
      }

    const user = em.create(User, {
      username,
      email,
      password,
      imgURL: GRAVATAR,
    })
    const errors = await validate(user)
    if (errors.length > 0) {
      // console.log(errors);
      return { ok: false, errors: formatErrors(errors) }
    }
    try {
      const profile = new Profile()
      user.profile = profile
      em.persist(profile)
      await em.flush()
      return { ok: true }
    } catch (err) {
      console.log(err)
      return {
        ok: false,
        errors: [{ path: 'unknown', message: 'Server Error' }],
      }
    }
  }

  // Login

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req, em }: MyContext
  ) {
    try {
      const user = await em.findOne(
        User,
        {
          username,
        },
        { populate: ['password'] }
      )
      if (!user) {
        return {
          ok: false,
          errors: [{ path: 'username', message: 'User does not exist' }],
        }
      }
      const valid = await user.verifyPassword(password)
      if (!valid) {
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Incorrect Password' }],
        }
      }
      const token = createToken(user)
      req.userId = user.id
      return { ok: true, user, token }
    } catch (err) {
      console.log(err)
      return { ok: false }
    }
  }
}
