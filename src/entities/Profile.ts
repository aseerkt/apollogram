import { IsUrl } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { User } from './User';

@ObjectType()
@Entity('profiles')
export class Profile extends BaseColumns {
  constructor(profile: Partial<Profile>) {
    super();
    Object.assign(this, profile);
  }

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

  // Relations

  @Column()
  username: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;
}
