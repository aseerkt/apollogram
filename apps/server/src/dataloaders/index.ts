import { EntityManager } from '@mikro-orm/postgresql'
import { createCommentLoader } from './createCommentLoader.js'
import { createFollowLoader } from './createFollowLoader.js'
import { createLikeLoader } from './createLikeLoader.js'
import { createProfileLoader } from './createProfileLoader.js'
import { createUserLoader } from './createUserLoader.js'

export function createLoader(em: EntityManager) {
  return {
    user: createUserLoader(em),
    profile: createProfileLoader(em),
    like: createLikeLoader(em),
    follow: createFollowLoader(em),
    comment: createCommentLoader(em),
  }
}
