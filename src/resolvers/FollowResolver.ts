import { Arg, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql';
import { Follow } from '../entities/Follow';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

export class FollowResolver {
  // Get Follow Suggestions

  @Query(() => [User])
  async getFollowSuggestions(@Ctx() { req }: MyContext): Promise<User[]> {
    const user = await User.findOne(req.session.userId);
    const followingUsers = user?.followings.map(({ following }) => following);
    const followingUsersId = followingUsers?.map(({ id }) => id);
    if (followingUsersId) {
      const allUsers = await User.find();
      const remainingUsers = allUsers.filter(
        (user) =>
          !followingUsersId.includes(user.id) && user.id !== req.session.userId
      );
      return remainingUsers;
    }
    return [];
  }

  // Follow / Unfollow

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleFollow(
    @Arg('userId') userId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const following = await Follow.findOne({
        where: { followingId: userId, followerId: req.session.userId },
      });
      // console.log('got this far');
      if (following && userId !== req.session.userId) {
        await following.remove();
        return true;
      } else {
        await Follow.create({
          followerId: req.session.userId,
          followingId: userId,
        }).save();
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}
