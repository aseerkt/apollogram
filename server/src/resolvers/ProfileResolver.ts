import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { MyContext } from '../types';
import { AuthenticationError } from 'apollo-server-express';
import { uploadFile } from '../utils/uploadFile';
import { User } from '../entities/User';

@Resolver()
export class ProfileResolver {
  @Mutation(() => Boolean)
  async updateProfile(
    @Arg('fullName') fullName: string,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    if (!userId) {
      throw new AuthenticationError('Not Authorized');
    }
    const user = await User.findOne(userId);
    if (file) {
      const { isUploaded, imgURL } = await uploadFile(file, 'profile');
      console.log(isUploaded);
      if (isUploaded && user) {
        user.imgURL = imgURL;
        console.log(fullName);
        user.fullName = fullName;
        await user.save();
        return true;
      }
    } else {
      if (user) {
        user.fullName = fullName;
        await user.save();
        return true;
      }
    }
    return false;
  }
}
