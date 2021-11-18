import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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
  @Column()
  postId: string;

  @Field()
  @Column()
  username: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;
}
