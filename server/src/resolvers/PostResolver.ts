import { createWriteStream } from 'fs';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import path from 'path';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '../entities/Post';
import { isAuth } from '../middlewares/isAuth';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getPosts() {
    return Post.find();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addPost(
    @Arg('file', () => GraphQLUpload)
    file: FileUpload
  ): Promise<boolean> {
    const { filename, createReadStream } = file;
    console.log(file);
    const uploadTime = new Date().toISOString();
    const pathName = path.join(
      __dirname,
      `../../images/${uploadTime}_${filename}`
    );
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(pathName, { autoClose: true }))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
