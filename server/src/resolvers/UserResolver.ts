import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
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
import { COOKIE_NAME } from '../constants';
import { Profile } from '../entities/Profile';
import { Post } from '../entities/Post';

@Resolver(User)
export class UserResolver {
  // Email Field Resolver
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.username === user.username) {
      return user.email;
    }
    return '';
  }

  @FieldResolver(() => Profile)
  profile(@Root() user: User, @Ctx() { profileLoader }: MyContext) {
    return profileLoader.load(user.username);
  }

  @FieldResolver(() => [Post])
  posts(@Root() user: User) {
    return Post.find({ where: { username: user.username } });
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    return User.findOne({
      where: { username: req.session.username },
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
      console.log(errors);
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
      req.session.username = user.username;
      return { ok: true, user };
    } catch (err) {
      return { ok: false };
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      });
    });
  }
}
