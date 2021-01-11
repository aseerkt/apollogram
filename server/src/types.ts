import { Field, ObjectType } from 'type-graphql';
import { Request, Response } from 'express';

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
}
