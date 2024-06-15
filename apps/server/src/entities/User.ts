import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  Property,
  type EventArgs,
} from '@mikro-orm/core'
import { hash, verify } from 'argon2'
import { IsEmail, MinLength } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { GRAVATAR } from '../constants.js'
import { BaseEntity } from './BaseEntity.js'
import { Post } from './Post.js'
import { Profile } from './Profile.js'
// import { Follow } from './Follow.js';

@ObjectType()
@Entity({ tableName: 'users' })
export class User extends BaseEntity<'name' | 'profile'> {
  @Field()
  @MinLength(3, { message: 'Username must be atleast 3 characters long' })
  @Index()
  @Property({ unique: true })
  username: string

  @Field()
  @IsEmail(undefined, { message: 'Invalid Email Address' })
  @Property({ unique: true })
  email: string

  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Property({ hidden: true, lazy: true })
  password: string

  @Field()
  @Property({ default: GRAVATAR })
  imgURL: string = GRAVATAR

  @Field()
  @Property({ default: '' })
  name: string

  // Relations

  @Field(() => [Post])
  @OneToMany({ mappedBy: 'author' })
  posts = new Collection<Post>(this)

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile

  // @OneToMany(() => Follow, (follow) => follow.user)
  // followings: Follow[];

  // @OneToMany(() => Follow, (follow) => follow.following)
  // followers: Follow[];

  // // Methods
  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    const password = args.changeSet?.payload.password

    if (password) {
      this.password = await hash(this.password)
    }
  }

  verifyPassword(password: string) {
    return verify(this.password, password)
  }
}
