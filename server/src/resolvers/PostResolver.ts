import { AuthenticationError } from 'apollo-server-express';
import { validate } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { FieldError, MyContext } from '../types';
import { formatErrors } from '../utils/formatErrors';
import { uploadFile } from '../utils/uploadFile';

@ObjectType()
class CreatePostResponse {
  @Field()
  ok: boolean;
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getPosts() {
    return Post.find({ order: { createdAt: 'DESC' }, relations: ['user'] });
  }

  @Mutation(() => CreatePostResponse)
  async addPost(
    @Arg('caption') caption: string,
    @Ctx() { req }: MyContext,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload
  ): Promise<CreatePostResponse> {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      throw new AuthenticationError('Unauthorized');
    }
    const { isUploaded, imgURL } = await uploadFile(file, 'posts');
    if (isUploaded) {
      const post = Post.create({ caption, imgURL, user });
      const errors = await validate(post);
      if (errors.length > 0) {
        return { ok: false, error: formatErrors(errors)[0] };
      }
      await post.save();
      return { ok: true, post };
    }
    return { ok: false, error: { path: 'file', message: 'File Upload Fail' } };
  }
}
/*
 * curl 'http://localhost:5000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:5000' --data-binary '{"query":"mutation AddPost($file: Upload!){\n  addPost(file)\n}"}' --compressed
 *
 */
