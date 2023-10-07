import { ObjectType, Field, ArgsType } from 'type-graphql';
import { User } from '../entities/User';
import { FieldError } from '../types';

@ObjectType()
export class RegisterResponse {
  @Field()
  ok: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class LoginResponse extends RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;
}

@ArgsType()
export class RegisterVariables {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
