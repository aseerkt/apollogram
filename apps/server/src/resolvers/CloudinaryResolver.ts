import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { createUploadSignature } from '../utils/cloudinary.js';
import { CloudinarySignature, EnumFilePathPrefix } from '../types.js';
import { isAuth } from '../middlewares/isAuth.js';

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
