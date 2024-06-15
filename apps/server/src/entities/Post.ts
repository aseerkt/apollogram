import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { MinLength } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity.js'
import { Comment } from './Comment.js'
import { Like } from './Like.js'
import { User } from './User.js'

@ObjectType()
@Entity({ tableName: 'posts' })
export class Post extends BaseEntity<'author' | 'comments' | 'likes'> {
  @Field()
  @MinLength(3, { message: 'Post caption must be minimum 3 characters long' })
  @Property()
  caption: string

  @Field()
  @Property()
  imgURL: string

  // Relations

  @ManyToOne({ name: 'author_id' })
  author: User

  @OneToMany(() => Comment, (comment) => comment.post, { orphanRemoval: true })
  comments: Comment[]

  @OneToMany(() => Like, (like) => like.post, { orphanRemoval: true })
  likes: Like[]
}
