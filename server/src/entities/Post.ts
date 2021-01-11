import { MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {
  @Field()
  @MinLength(3, { message: 'Post caption must be minimum 3 characters long' })
  @Column()
  caption: string;

  @Field()
  @Column()
  imgURL: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  user: User;
}
