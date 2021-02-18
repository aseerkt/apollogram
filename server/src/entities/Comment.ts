import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity('comments')
export class Comment extends BaseColumns {
  @Field()
  @Column('text')
  text: string;

  @Field()
  @Column('uuid')
  postId: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  username: string;

  @AfterLoad()
  setUsername() {
    this.username = this.user.username;
  }

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
