import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import path from 'path';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { PostResponse } from '../types/postTypes';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getPosts() {
    return Post.find();
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async addPost(
    @Arg('caption') caption: string,
    @Arg('image', () => GraphQLUpload)
    file: FileUpload,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    if (caption.length < 5) {
      return { error: 'Caption must be at least 5 characters long' };
    }
    const { filename, createReadStream } = file;
    console.log('Hero goes file', file);
    const uploadTime = new Date().toISOString();
    return new Promise<PostResponse>((resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../images/${uploadTime}_${filename}`)
          )
        )
        .on('finish', async () => {
          console.log('finished upload');
          const user = await User.findOne({ id: req.session.userId });
          const post = Post.create({
            caption,
            imgURL: `${req.headers.host}/images/${uploadTime}_${filename}`,
            user,
          });
          await post.save();
          resolve({ post });
        })
        .on('error', (err) => {
          console.log(err);
          resolve({ error: err.message });
        });
    });
  }
}
