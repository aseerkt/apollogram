import { EntityManager } from '@mikro-orm/postgresql'
import { FastifyRequest } from 'fastify'
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from 'type-graphql'
import { createLoader } from './dataloaders/index.js'

@ObjectType()
export class FieldError {
  @Field()
  path: string

  @Field()
  message: string
}

export enum EnumFilePathPrefix {
  PROFILES = 'profiles',
  POSTS = 'posts',
}

registerEnumType(EnumFilePathPrefix, { name: 'EnumFilePathPrefix' })

@InputType()
export class CloudinaryUploadResult {
  @Field()
  publicId: string

  @Field()
  signature: string

  @Field()
  version: number
}

@ObjectType()
export class CloudinarySignature {
  @Field()
  signature: string

  @Field(() => Int)
  timestamp: number

  @Field()
  publicId: string
}

export interface MyContext {
  req: FastifyRequest & { userId?: number }
  em: EntityManager
  loader: ReturnType<typeof createLoader>
}
