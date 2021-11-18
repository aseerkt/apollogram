import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

// User following who

@ObjectType()
@Entity('follows')
export class Follow extends BaseEntity {
  @Field()
  @PrimaryColumn()
  username: string;

  @Field()
  @PrimaryColumn()
  followingUsername: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingUsername', referencedColumnName: 'username' })
  following: User;
}
