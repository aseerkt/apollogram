import { hash } from 'argon2';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';
import { verify } from 'argon2';
import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Post } from './Post';
import { BaseEntity } from './BaseEntity';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @IsAlphanumeric(undefined, { message: 'Username must be alphanumeric' })
  @MinLength(3, { message: 'Username must be atleast 3 characters long' })
  @Column({ unique: true })
  username: string;

  @Field()
  @IsEmail(undefined, { message: 'Invalid Email Address' })
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: '' })
  fullName: string;

  @Field()
  @Column({ default: '/user.jpeg' })
  imgURL: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  verifyPassword(password: string) {
    return verify(this.password, password);
  }
}
