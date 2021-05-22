import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Follow } from '../entities/Follow';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver()
export class FollowerResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleFollow(
    @Arg('followingUsername', () => ID) followingUsername: string,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    try {
      const following = await Follow.findOne({
        where: { username: res.locals.username, followingUsername },
      });
      if (following) {
        await following.remove();
        return true;
      }
      await Follow.create({
        username: res.locals.username,
        followingUsername,
      }).save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getFollowSuggestions(@Ctx() { res }: MyContext): Promise<User[]> {
    const suggestions = await getConnection().query(
      `
        SELECT 
          "u"."id",
          "u"."username",
          "u"."email", 
          "u"."createdAt", 
          "u"."updatedAt"
        FROM "users" "u" 
        LEFT JOIN "follows" "f" 
        ON "f"."followingUsername" = "u"."username"
        WHERE "u"."username" != $1
        LIMIT 5
      `,
      [res.locals.username]
    );

    // "f"."followingUsername" != "u"."username"

    return suggestions;
  }
}
