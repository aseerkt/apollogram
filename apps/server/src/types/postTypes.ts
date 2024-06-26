import { Field, ObjectType } from 'type-graphql';
import { Post } from '../entities/Post.js';

@ObjectType()
export class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class PaginatedPost {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}
