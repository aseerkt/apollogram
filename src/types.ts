import { Field, ObjectType } from 'type-graphql';
import { Request, Response } from 'express';
import { createUserLoader } from './utils/createUserLoader';
import { createProfileLoader } from './utils/createProfileLoader';

@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}

export interface MyContext {
  req: Request;
  res: Response & { locals: { username: string } };
  userLoader: ReturnType<typeof createUserLoader>;
  profileLoader: ReturnType<typeof createProfileLoader>;
}
