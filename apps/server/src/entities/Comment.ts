import { Entity, ManyToOne, Opt, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity.js'
import { Post } from './Post.js'
import { User } from './User.js'

@ObjectType()
@Entity({ tableName: 'comments' })
export class Comment extends BaseEntity {
  @Field()
  @Property({ type: 'text' })
  text: string

  @ManyToOne(() => User)
  author: User & Opt

  @ManyToOne(() => Post)
  post: Post & Opt
}
