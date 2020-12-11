import { Field, ObjectType } from 'type-graphql';
import { Request, Response } from 'express';
import { Readable } from 'stream';

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

export interface Upload {
  stream: Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}
