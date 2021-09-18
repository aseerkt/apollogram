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
  followers,
  followings,
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
        WHERE username != $1
        AND username not in
          (SELECT "followingUsername" FROM follows where username = $1);
      `,
      [res.locals.username]
    );

    // "f"."followingUsername" != "u"."username"

    return suggestions;
  }

  // MUTATIONS

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleFollow(
    @Arg('followingUsername', () => ID) followingUsername: string,
    @Ctx() { res, followLoader }: MyContext
  ): Promise<boolean> {
    try {
      const following = await Follow.findOne({
        where: { username: res.locals.username, followingUsername },
      });
      if (following) {
        await following.remove();
      } else {
        await Follow.create({
          username: res.locals.username,
          followingUsername,
        }).save();
      }
      followLoader.clear(res.locals.username);
      followLoader.clear(followingUsername);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
