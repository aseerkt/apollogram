import { MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToMany, AfterLoad } from 'typeorm';
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  user: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  // Methods

  @AfterLoad()
  sortComments() {
    this.comments?.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}
