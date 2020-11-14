import { User } from '../entity/User';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { FieldError, MyContext } from '../types';
import argon2 from 'argon2';
import { minLengthErrors, uniqueErrors } from '../utils/formValidations';

@ObjectType()
export class UserResponse {
  @Field()
  ok: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors: [FieldError];
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const user1 = await User.findOne({ email });
    if (user1) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'Email already registered' }],
      };
    }
    const user2 = await User.findOne({ username });
    if (user2) {
      return {
        ok: false,
        errors: [{ path: 'username', message: 'Username is taken' }],
      };
    }
    let errors = [];
    errors.push(
      ...minLengthErrors('username', username, 3),
      ...minLengthErrors('password', password, 6)
    );
    if (errors.length > 0) {
      return { ok: false, errors };
    }

    const hashedPassword = await argon2.hash(password);
    const user = User.create({ username, email, password: hashedPassword });
    try {
      await user.save();
      return { ok: true };
    } catch (err) {
      console.log(err.code);
      let errors = uniqueErrors(err);
      if (errors.length > 0) return { ok: false, errors };
      return { ok: false };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return {
          ok: false,
          errors: [{ path: 'username', message: 'User does not exist' }],
        };
      }
      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Invalid Password' }],
        };
      }
      req.session.userId = user.id;
      return { ok: true };
    } catch (err) {
      return { ok: false };
    }
  }
}
