import { buildSchema } from 'type-graphql'
import { CloudinaryResolver } from './resolvers/CloudinaryResolver.js'
import { CommentResolver } from './resolvers/CommentResolver.js'
import { FollowResolver } from './resolvers/FollowResolver.js'
import { LikeResolver } from './resolvers/LikeResolver.js'
import { PostResolver } from './resolvers/PostResolver.js'
import { ProfileResolver } from './resolvers/ProfileResolver.js'
import { UserResolver } from './resolvers/UserResolver.js'

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      ProfileResolver,
      PostResolver,
      CommentResolver,
      LikeResolver,
      CloudinaryResolver,
      FollowResolver,
    ],
  })
