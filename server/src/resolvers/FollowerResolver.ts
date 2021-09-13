import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Follow } from '../entities/Follow';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

enum FollowEnum {
  Followers,
  Followings,
}

registerEnumType(FollowEnum, { name: 'FollowEnum' });

@Resolver()
export class FollowerResolver {
  // QUERIES

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
        FROM users u
        WHERE username != '$1'
        AND username not in
          (SELECT "followingUsername" FROM follows where username = $1);
      `,
      [res.locals.username]
    );

    // "f"."followingUsername" != "u"."username"

    return suggestions;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getFollows(
    @Arg('username') username: string,
    @Arg('selector', () => FollowEnum) selector: FollowEnum
  ) {
    if (selector === FollowEnum.Followers) {
      const followers = await getConnection().query(
        `
        SELECT 
          "u"."id",
          "u"."username",
          "u"."email",
          "u"."createdAt",
          "u"."updatedAt"
        FROM "users" "u"
        LEFT JOIN "follows" "f"
        ON "f"."username" = "u"."username"
        WHERE "f"."followingUsername" = $1
      `,
        [username]
      );
      return followers;
    } else {
      const followings = await getConnection().query(
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
        WHERE "f"."username" = $1
      `,
        [username]
      );
      return followings;
    }
  }

  // MUTATIONS

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
}
