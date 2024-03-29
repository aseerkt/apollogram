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
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResult, FieldError, MyContext } from '../types';

import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { isAuth } from '../middlewares/isAuth';
import { validate } from 'class-validator';
import { formatErrors } from '../utils/formatErrors';
import { getUserFromToken } from '../utils/checkUserFromCookie';
import { CLOUDINARY_ROOT_PATH } from '../constants';
import { AppDataSource } from '../data-source';
import { verifySignature } from '../utils/cloudinary';

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
  gender(@Root() profile: Profile, @Ctx() { req }: MyContext): string {
    if (req.username == profile.username) {
      return profile.gender;
    }
    return '';
  }

  // MUTATIONS

  // Change Profile Photo

  @Mutation(() => Boolean)
  async changeProfilePhoto(
    @Arg('uploadResult') uploadResult: CloudinaryUploadResult,
    @Ctx() ctx: MyContext
  ) {
    verifySignature(uploadResult);

    const { username } = await getUserFromToken(ctx);
    const user = await User.findOne({ where: { username } });

    if (user) {
      if (user.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
        await cloudinary.uploader.destroy(user.imgURL);
      }

      user.imgURL = uploadResult.publicId;
      await user.save();
      return true;
    }
    return false;
  }

  // Remove Profile Photo

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async removeProfilePhoto(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      where: { username: req.username },
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
    @Ctx() { req }: MyContext
  ): Promise<EditProfileResponse> {
    const user = await User.findOne({
      where: { username: req.username },
    });
    const profile = await Profile.findOneBy({ username: req.username });

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
        await AppDataSource.manager.transaction(async (tem) => {
          await tem.save(user);
          await tem.save(profile);
        });
        return { user };
      } catch (err) {
        console.log(err);
      }
    }
    return {
      errors: [{ path: 'unknown', message: 'Server Error' }],
    };
  }
}
