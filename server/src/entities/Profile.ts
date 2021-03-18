import { IsUrl } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EXPRESS_ENDPOINT } from '../constants';
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

  // Relations

  @Column()
  username: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @AfterLoad()
  setProfilePhoto() {
    this.imgURL =
      this.imgURL.startsWith('images/') || this.imgURL.startsWith('/user.jpg')
        ? `${EXPRESS_ENDPOINT}/${this.imgURL}`
        : this.imgURL;
  }
}
