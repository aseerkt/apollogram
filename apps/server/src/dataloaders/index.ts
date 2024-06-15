import { EntityManager } from '@mikro-orm/postgresql'
import { createCommentCountLoader } from './createCommentCountLoader.js'
import { createCommentLoader } from './createCommentLoader.js'
import { createFollowLoader } from './createFollowLoader.js'
import { createLikeCountLoader } from './createLikeCountLoader.js'
import { createLikeLoader } from './createLikeLoader.js'
import { createProfileLoader } from './createProfileLoader.js'
import { createUserLoader } from './createUserLoader.js'

export function createLoader(em: EntityManager) {
  return {
    user: createUserLoader(em),
    profile: createProfileLoader(em),
    like: createLikeLoader(em),
    likeCount: createLikeCountLoader(em),
    commentCount: createCommentCountLoader(em),
    follow: createFollowLoader(em),
    comment: createCommentLoader(em),
  }
}
