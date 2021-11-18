import { hash } from 'argon2';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';
import { verify } from 'argon2';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  OneToOne,
  Index,
} from 'typeorm';
import { Post } from './Post';
import { BaseColumns } from './BaseColumns';
import { Profile } from './Profile';
// import { Follow } from './Follow';

@ObjectType()
@Entity('users')
export class User extends BaseColumns {
  @Field()
  @IsAlphanumeric(undefined, { message: 'Username must be alphanumeric' })
  @MinLength(3, { message: 'Username must be atleast 3 characters long' })
  @Index()
  @Column({ unique: true })
  username: string;

  @Field()
  @IsEmail(undefined, { message: 'Invalid Email Address' })
  @Column({ unique: true })
  email: string;

  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Column()
  password: string;

  @Field()
  @Column({ default: '' })
  imgURL: string;

  @Field()
  @Column({ default: '' })
  name: string;

  // Relations

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  // @OneToMany(() => Follow, (follow) => follow.user)
  // followings: Follow[];

  // @OneToMany(() => Follow, (follow) => follow.following)
  // followers: Follow[];

  // Methods
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  verifyPassword(password: string) {
    return verify(this.password, password);
  }
}
