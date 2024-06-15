import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/postgresql'
import { Comment } from './entities/Comment.js'
import { Like } from './entities/Like.js'
import { Post } from './entities/Post.js'
import { User } from './entities/User.js'

export interface Services {
  orm: MikroORM
  em: EntityManager
  post: EntityRepository<Post>
  user: EntityRepository<User>
  comment: EntityRepository<Comment>
  like: EntityRepository<Like>
}

let cache: Services

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache
  }

  const orm = await MikroORM.init(options)

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    post: orm.em.getRepository(Post),
    user: orm.em.getRepository(User),
    comment: orm.em.getRepository(Comment),
    like: orm.em.getRepository(Like),
  })
}
