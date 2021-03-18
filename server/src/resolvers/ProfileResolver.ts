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
import { FieldError, MyContext } from '../types';
import { AuthenticationError } from 'apollo-server-express';
import { uploadFile } from '../utils/uploadFile';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { isAuth } from '../middlewares/isAuth';
import { validate } from 'class-validator';
import { formatErrors } from '../utils/formatErrors';
import { getManager } from 'typeorm';

@ArgsType()
export class EditProfileArgs {
  @Field()
  name: string;

  @Field()
  username: string;

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
  @Field()
  ok: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(Profile)
export class ProfileResolver {
  @FieldResolver(() => String)
  gender(@Root() profile: Profile, @Ctx() { req }: MyContext) {
    if (req.session.username == profile.username) {
      return profile.gender;
    }
    return '';
  }

  @FieldResolver(() => String)
  name(@Root() profile: Profile, @Ctx() { req }: MyContext) {
    if (req.session.username == profile.username) {
      return profile.name;
    }
    return '';
  }

  // Change Profile Photo

  @Mutation(() => Boolean)
  async changeProfilePhoto(
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { req }: MyContext
  ) {
    const { username } = req.session;
    if (!username) {
      throw new AuthenticationError('Not Authorized');
    }
    const profile = await Profile.findOne({ where: { username } });
    if (profile && file) {
      const { isUploaded, imgURL } = await uploadFile(file, 'profile');
      console.log(isUploaded);
      if (isUploaded) {
        profile.imgURL = imgURL;
        await profile.save();
        return true;
      }
    }
    return false;
  }

  // Remove Profile Photo

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async removeProfilePhoto(@Ctx() { req }: MyContext) {
    const profile = await Profile.findOne({
      where: { username: req.session.username },
    });
    if (profile) {
      profile.imgURL = '/user.jpg';
      await profile.save();
      return profile;
    }
    return false;
  }

  // Edit Profile Fields

  @Mutation(() => EditProfileResponse)
  @UseMiddleware(isAuth)
  async editProfile(
    @Args() { name, gender, website, bio, email, username }: EditProfileArgs,
    @Ctx() { req }: MyContext
  ): Promise<EditProfileResponse> {
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    const profile = await Profile.findOne({ user });

    if (profile && user) {
      user.email = email;
      user.username = username;
      profile.gender = gender;
      profile.website = website;
      profile.name = name;
      profile.bio = bio;
      try {
        const userErrors = await validate(user);
        const profileErrors = await validate(profile);
        if (userErrors.length > 0 || profileErrors.length > 0) {
          const errors = formatErrors([...userErrors, ...profileErrors]);
          return { ok: false, errors };
        }
        await getManager().transaction(async (tem) => {
          await tem.save(user);
          await tem.save(profile);
        });
        return { ok: true };
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(profile, user);
    }
    return {
      ok: false,
      errors: [{ path: 'unknown', message: 'Server Error' }],
    };
  }
}
