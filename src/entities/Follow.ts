import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { User } from './User';

@ObjectType()
@Entity('follows')
export class Follow extends BaseColumns {
  @Column()
  followerId: string;

  @Column()
  followingId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  follower: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followers, {
    eager: true,
    onDelete: 'CASCADE',
  })
  following: User;
}
