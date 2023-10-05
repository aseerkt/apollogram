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
} from 'type-graphql';
import { validate } from 'class-validator';
import { User } from '../entities/User';
import { MyContext } from '../types';
import {
  LoginResponse,
  RegisterResponse,
  RegisterVars,
} from '../types/userTypes';
import { formatErrors } from '../utils/formatErrors';
import { CLOUDINARY_ROOT_PATH, __prod__ } from '../constants';
import { Profile } from '../entities/Profile';
import { Post } from '../entities/Post';
import { createToken } from '../utils/tokenHandler';
import { isUser } from '../middlewares/isUser';
import { isAuth } from '../middlewares/isAuth';
import { generateUrl } from '../utils/uploadHandler';

@Resolver(User)
export class UserResolver {
  // Field Resolvers

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext): string {
    if (req.username === user.username) {
      return user.email;
    }
    return '';
  }

  @FieldResolver(() => String)
  imgURL(@Root() user: User): string {
    if (user.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
      return generateUrl(user.imgURL, 'profiles');
    }
    return user.imgURL;
  }

  @FieldResolver(() => Profile)
  profile(
    @Root() user: User,
    @Ctx() { profileLoader }: MyContext
  ): Promise<Profile> {
    return profileLoader.load(user.username);
  }

  @FieldResolver(() => [Post])
  posts(@Root() user: User): Promise<Post[]> {
    return Post.find({
      where: { username: user.username },
      order: { createdAt: 'DESC' },
    });
  }

  @FieldResolver(() => Boolean)
  async isFollowing(
    @Root() user: User,
    @Ctx() { req, followLoader }: MyContext
  ): Promise<boolean> {
    if (!req.username) return false;
    if (req.username === user.username) return false;
    const following = await followLoader.load({
      username: req.username,
      followingUsername: user.username,
    });
    return following ? true : false;
  }

  // QUERIES

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { req }: MyContext) {
    return User.findOne({
      where: { username: req.username },
    });
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  getUser(@Arg('username') username: string) {
    return User.findOne({
      where: { username },
    });
  }

  // Register

  @Mutation(() => RegisterResponse)
  async register(
    @Args() { email, username, password }: RegisterVars
  ): Promise<RegisterResponse> {
    let errors = [];
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });
    if (emailUser)
      errors.push({ path: 'email', message: 'Email already registered' });
    if (usernameUser)
      errors.push({ path: 'username', message: 'Username already taken' });

    if (errors.length > 0)
      return {
        ok: false,
        errors,
      };

    const user = User.create({ username, email, password });
    errors = await validate(user);
    if (errors.length > 0) {
      // console.log(errors);
      return { ok: false, errors: formatErrors(errors) };
    }
    try {
      await user.save();
      await Profile.create({ username: user.username }).save();
      return { ok: true };
    } catch (err) {
      console.log(err);

      return {
        ok: false,
        errors: [{ path: 'unknown', message: 'Server Error' }],
      };
    }
  }

  // Login

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          errors: [{ path: 'username', message: 'User does not exist' }],
        };
      }
      const valid = await user.verifyPassword(password);
      if (!valid) {
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Incorrect Password' }],
        };
      }
      createToken(user);
      req.username = user.username;
      return { ok: true, user };
    } catch (err) {
      return { ok: false };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
