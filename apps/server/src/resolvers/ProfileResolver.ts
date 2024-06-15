import { v2 as cloudinary } from 'cloudinary'
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
} from 'type-graphql'
import { CloudinaryUploadResult, FieldError, type MyContext } from '../types.js'

import { validate } from 'class-validator'
import { CLOUDINARY_ROOT_PATH } from '../constants.js'
import { Profile } from '../entities/Profile.js'
import { User } from '../entities/User.js'
import { isAuth } from '../middlewares/isAuth.js'
import { getUserFromToken } from '../utils/checkUserFromCookie.js'
import { verifySignature } from '../utils/cloudinary.js'
import { formatErrors } from '../utils/formatErrors.js'

@ArgsType()
export class EditProfileArgs {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  website: string

  @Field()
  bio: string

  @Field()
  gender: 'Male' | 'Female' | 'Prefer not to say' | ''
}

@ObjectType()
export class EditProfileResponse {
  @Field(() => User, { nullable: true })
  user?: User
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@Resolver(Profile)
export class ProfileResolver {
  // FIELD RESOLVERS

  @FieldResolver(() => String)
  gender(@Root() profile: Profile, @Ctx() { req }: MyContext): string {
    if (req.userId == profile.user.id) {
      return profile.gender
    }
    return ''
  }

  // MUTATIONS

  // Change Profile Photo

  @Mutation(() => Boolean)
  async changeProfilePhoto(
    @Arg('uploadResult') uploadResult: CloudinaryUploadResult,
    @Ctx() { em, req }: MyContext
  ) {
    verifySignature(uploadResult)

    const { userId } = await getUserFromToken(req)
    const user = await em.findOne(User, userId)

    if (user) {
      if (user.imgURL.includes(CLOUDINARY_ROOT_PATH)) {
        await cloudinary.uploader.destroy(user.imgURL)
      }

      user.imgURL = uploadResult.publicId
      await em.flush()
      return true
    }
    return false
  }

  // Remove Profile Photo

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async removeProfilePhoto(@Ctx() { req, em }: MyContext) {
    const user = await em.findOne(User, req.userId!)
    if (user) {
      user.imgURL = '/user.jpg'
      await em.flush()
      return user
    }
    return false
  }

  // Edit Profile Fields

  @Mutation(() => EditProfileResponse)
  @UseMiddleware(isAuth)
  async editProfile(
    @Args() { name, gender, website, bio, email }: EditProfileArgs,
    @Ctx() { req, em }: MyContext
  ): Promise<EditProfileResponse> {
    const user = await em.findOne(User, req.userId!)
    const profile = await em.findOne(Profile, {
      user: req.userId!,
    })

    if (profile && user) {
      user.email = email
      user.name = name
      profile.gender = gender
      profile.website = website
      profile.bio = bio
      try {
        const userErrors = await validate(user)
        const profileErrors = await validate(profile)
        if (userErrors.length > 0 || profileErrors.length > 0) {
          const errors = formatErrors([...userErrors, ...profileErrors])
          return { errors }
        }

        await em.flush()

        return { user }
      } catch (err) {
        console.log(err)
      }
    }
    return {
      errors: [{ path: 'unknown', message: 'Server Error' }],
    }
  }
}
