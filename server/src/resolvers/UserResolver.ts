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
import { COOKIE_NAME, FRONTEND_URL, __prod__ } from '../constants';
import { Profile } from '../entities/Profile';
import { Post } from '../entities/Post';
import { createTokenCookie } from '../utils/tokenHandler';
import { isUser } from '../middlewares/isUser';
import { isAuth } from '../middlewares/isAuth';
import { extractDomainFromUrl } from '../utils/extractDomainFromUrl';

@Resolver(User)
export class UserResolver {
  // Email Field Resolver
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { res }: MyContext) {
    if (res.locals.username === user.username) {
      return user.email;
    }
    return '';
  }

  @FieldResolver(() => Profile)
  profile(@Root() user: User, @Ctx() { profileLoader }: MyContext) {
    return profileLoader.load(user.username);
  }

  @FieldResolver(() => [Post])
  @UseMiddleware(isUser)
  posts(@Root() user: User) {
    return Post.find({ where: { username: user.username } });
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { res }: MyContext) {
    return User.findOne({
      where: { username: res.locals.username },
    });
  }

  @Query(() => User, { nullable: true })
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
    @Ctx() { res }: MyContext
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
      createTokenCookie(user, res);
      return { ok: true, user };
    } catch (err) {
      return { ok: false };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { res }: MyContext) {
    return new Promise((resolve) => {
      res.clearCookie(COOKIE_NAME, {
        path: '/',
        domain: extractDomainFromUrl(FRONTEND_URL!),
      });
      resolve(true);
    });
  }
}
