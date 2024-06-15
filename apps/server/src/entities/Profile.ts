import { Entity, OneToOne, Property, type Rel } from '@mikro-orm/core'
import { IsUrl } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity.js'
import { User } from './User.js'

@ObjectType()
@Entity({ tableName: 'profiles' })
export class Profile extends BaseEntity {
  @Field()
  @IsUrl(undefined, { message: 'Invalid Website URL' })
  @Property({ default: '' })
  website: string

  @Field()
  @Property({ type: 'text', default: '' })
  bio: string

  @Field()
  @Property({ default: '' })
  gender: 'Male' | 'Female' | 'Prefer not to say' | ''

  @OneToOne(() => User, (user) => user.profile, {
    name: 'user_id',
    owner: true,
    orphanRemoval: true,
  })
  user: Rel<User>
}
