import { MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  AfterLoad,
} from 'typeorm';
import { EXPRESS_ENDPOINT } from '../constants';
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

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  // Methods
  @AfterLoad()
  generateURL() {
    this.imgURL = this.imgURL.startsWith('images/')
      ? `${EXPRESS_ENDPOINT}/${this.imgURL}`
      : this.imgURL;
  }
}
