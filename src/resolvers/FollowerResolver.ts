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
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Follow } from '../entities/Follow';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@ObjectType()
class FollowData {
  @Field(() => [User])
  followers: User[];
  @Field(() => [User])
  followings: User[];
}

@Resolver()
export class FollowerResolver {
  // QUERIES

  @Query(() => FollowData, { nullable: true })
  @UseMiddleware(isAuth)
  async getFollows(@Arg('username') username: string): Promise<FollowData> {
    const followData = await Follow.find({
      where: [{ username }, { followingUsername: username }],
      relations: ['user', 'following'],
    });

    const followers = followData
      .filter((follow) => follow.followingUsername === username)
      .map((follow) => follow.user);
    const followings = followData
      .filter((follow) => follow.username === username)
      .map((follow) => follow.following);

    return { followers, followings };
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getFollowSuggestions(@Ctx() { res }: MyContext): Promise<User[]> {
    const suggestions = await getConnection().query(
      /*sql*/ `
        SELECT 
          u.*
        FROM users u
        WHERE username != $1
        AND username NOT IN
          (SELECT "followingUsername" FROM follows where username = $1);
      `,
      [res.locals.username]
    );

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
      followLoader.clear({
        username: res.locals.username,
        followingUsername,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
