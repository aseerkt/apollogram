import { Entity, ManyToOne, Opt } from '@mikro-orm/core'
import { ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity.js'
import { User } from './User.js'

// User following who

@ObjectType()
@Entity({ tableName: 'follows' })
export class Follow extends BaseEntity {
  @ManyToOne(() => User)
  follower: User & Opt

  @ManyToOne(() => User)
  following: User & Opt
}
