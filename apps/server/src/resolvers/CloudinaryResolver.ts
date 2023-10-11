import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { createUploadSignature } from '../utils/cloudinary';
import { CloudinarySignature, EnumFilePathPrefix } from '../types';
import { isAuth } from '../middlewares/isAuth';

@Resolver()
export class CloudinaryResolver {
  @Query(() => CloudinarySignature)
  @UseMiddleware(isAuth)
  getUploadSignature(
    @Arg('pathPrefix', () => EnumFilePathPrefix) pathPrefix: EnumFilePathPrefix
  ): CloudinarySignature {
    return createUploadSignature(pathPrefix);
  }
}
