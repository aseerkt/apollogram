import { Field, ObjectType } from 'type-graphql';
import { Request, Response } from 'express';
import { createUserLoader } from './utils/createUserLoader';

@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}

export interface MyContext {
  req: Request & { session: { userId: string } };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
}
