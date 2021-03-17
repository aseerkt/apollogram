import { IsUrl } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { User } from './User';

@ObjectType()
@Entity('profiles')
export class Profile extends BaseColumns {
  @Field()
  @Column({ default: '/user.jpg' })
  imgURL: string;

  @Field()
  @Column({ default: '' })
  name: string;

  @Field()
  @IsUrl(undefined, { message: 'Invalid Website URL' })
  @Column({ default: '' })
  website: string;

  @Field()
  @Column({ type: 'text', default: '' })
  bio: string;

  @Field()
  @Column({ default: '' })
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
