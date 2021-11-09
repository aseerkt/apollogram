import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { v2 as cloudinary } from 'cloudinary';
import { FieldError, MyContext } from '../types';
import { uploadToCloudinary } from '../utils/uploadHandler';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { isAuth } from '../middlewares/isAuth';
import { validate } from 'class-validator';
import { formatErrors } from '../utils/formatErrors';
import { getManager } from 'typeorm';
import { checkUserFromCookie } from '../utils/checkUserFromCookie';
import { CLOUDINARY_ROOT_PATH } from '../constants';

@ArgsType()
export class EditProfileArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  website: string;

  @Field()
  bio: string;

  @Field()
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';
}

@ObjectType()
export class EditProfileResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(Profile)
export class ProfileResolver {
  // FIELD RESOLVERS

  @FieldResolver(() => String)
  gender(@Root() profile: Profile, @Ctx() { res }: MyContext): string {
    if (res.locals.username == profile.username) {
      return profile.gender;
    }
    return '';
  }

  @FieldResolver(() => [User])
  async followers(
    @Root() profile: Profile,
    @Ctx() { followLoader, userLoader }: MyContext
  ): Promise<User[]> {
    const followData = await followLoader.load(profile.username);

    return await Promise.all(
      followData
        .filter((f) => f.state === 'follower')
        .map((f) => userLoader.load(f.username))
    );
  }

  @FieldResolver(() => [User])
  async followings(
    @Root() profile: Profile,
    @Ctx() { followLoader, userLoader }: MyContext
  ): Promise<User[]> {
    const followData = await followLoader.load(profile.username);

    return await Promise.all(
      followData
        .filter((f) => f.state === 'following')
        .map((f) => userLoader.load(f.username))
    );
  }

  // MUTATIONS

  // Change Profile Photo

  @Mutation(() => Boolean)
  async changeProfilePhoto(
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() ctx: MyContext
  ) {
    const { username } = await checkUserFromCookie(ctx);
    const user = await User.findOne({ where: { username } });
    if (user && file) {
      // if (profile.imgURL.startsWith('images/')) {
      //   unlinkSync(`public/${profile.imgURL}`);
      // }
      if (user.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
        await cloudinary.uploader.destroy(user.imgURL);
      }
      const { url } = await uploadToCloudinary(file, 'profiles');
      if (url) {
        user.imgURL = url;
        await user.save();
        return true;
      }
    }
    return false;
  }

  // Remove Profile Photo

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async removeProfilePhoto(@Ctx() { res }: MyContext) {
    const user = await User.findOne({
      where: { username: res.locals.username },
    });
    if (user) {
      user.imgURL = '/user.jpg';
      await user.save();
      return user;
    }
    return false;
  }

  // Edit Profile Fields

  @Mutation(() => EditProfileResponse)
  @UseMiddleware(isAuth)
  async editProfile(
    @Args() { name, gender, website, bio, email }: EditProfileArgs,
    @Ctx() { res }: MyContext
  ): Promise<EditProfileResponse> {
    const user = await User.findOne({
      where: { username: res.locals.username },
    });
    const profile = await Profile.findOne({ user });

    if (profile && user) {
      user.email = email;
      user.name = name;
      profile.gender = gender;
      profile.website = website;
      profile.bio = bio;
      try {
        const userErrors = await validate(user);
        const profileErrors = await validate(profile);
        if (userErrors.length > 0 || profileErrors.length > 0) {
          const errors = formatErrors([...userErrors, ...profileErrors]);
          return { errors };
        }
        await getManager().transaction(async (tem) => {
          await tem.save(user);
          await tem.save(profile);
        });
        return { user };
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(profile, user);
    }
    return {
      errors: [{ path: 'unknown', message: 'Server Error' }],
    };
  }
}
