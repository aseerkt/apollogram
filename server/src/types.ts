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
  req: Request & { session: { username: string } };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  profileLoader: ReturnType<typeof createProfileLoader>;
}
