import {
  Arg,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { Follow } from '../entities/Follow.js'
import { User } from '../entities/User.js'
import { isAuth } from '../middlewares/isAuth.js'
import { type MyContext } from '../types.js'

@ObjectType()
class FollowData {
  @Field(() => [User])
  followers: User[]
  @Field(() => [User])
  followings: User[]
}

@Resolver()
export class FollowResolver {
  // QUERIES

  @Query(() => FollowData, { nullable: true })
  @UseMiddleware(isAuth)
  async getFollows(
    @Arg('userId') userId: number,
    @Ctx() { em }: MyContext
  ): Promise<FollowData> {
    const followRepository = em.getRepository(Follow)

    const [followers, followings] = await Promise.all([
      followRepository
        .find({ following: userId }, { populate: ['follower'] })
        .then((follows) => follows.map((f) => f.follower)),
      followRepository
        .find({ follower: userId }, { populate: ['following'] })
        .then((follows) => follows.map((f) => f.following)),
    ])

    return { followers, followings }
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getFollowSuggestions(@Ctx() { req, em }: MyContext): Promise<User[]> {
    const followerIds = await em
      .createQueryBuilder(Follow)
      .select('followingId')
      .where({ followerId: req.userId })
    const suggestions = await em
      .createQueryBuilder(User)
      .where({ username: { $nin: followerIds } })

    return suggestions
  }

  // MUTATIONS

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleFollow(
    @Arg('followingId', () => ID) followingId: number,
    @Ctx() { req, em, loader }: MyContext
  ): Promise<boolean> {
    try {
      const following = await em.findOne(Follow, {
        follower: req.userId!,
        following: followingId,
      })
      if (following) {
        em.remove(following)
      } else {
        const following = em.create(Follow, {
          follower: req.userId!,
          following: followingId,
        })
        em.persist(following)
      }
      await em.flush()
      loader.follow.clear({
        followerId: req.userId!,
        followingId,
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
