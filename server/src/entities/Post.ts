import { MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @MinLength(3, { message: 'Post caption must be minimum 3 characters long' })
  @Column()
  caption: string;

  @Field()
  @Column()
  imgURL: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;
}
