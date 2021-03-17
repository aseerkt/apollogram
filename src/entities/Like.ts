import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity('likes')
export class Like extends BaseColumns {
  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('uuid')
  postId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;
}
