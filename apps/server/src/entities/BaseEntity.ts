import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export abstract class BaseEntity<Optional = never> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional

  @Field(() => ID)
  @PrimaryKey()
  id: number

  @Field(() => Date)
  @Property()
  createdAt = new Date()

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
