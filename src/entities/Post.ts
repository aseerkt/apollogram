import { MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { Comment } from './Comment';
import { Like } from './Like';
import { User } from './User';

@ObjectType()
@Entity('posts')
export class Post extends BaseColumns {
  @Field()
  @MinLength(3, { message: 'Post caption must be minimum 3 characters long' })
  @Column()
  caption: string;

  @Field()
  @Column()
  imgURL: string;

  // Relations

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ default: 0 })
  likeCount: number;

  @Field()
  @Column({ default: 0 })
  commentCount: number;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
