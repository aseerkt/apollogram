import { Field, ObjectType } from 'type-graphql';
import { Post } from '../entities/Post';

@ObjectType()
export class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field({ nullable: true })
  error?: string;
}
