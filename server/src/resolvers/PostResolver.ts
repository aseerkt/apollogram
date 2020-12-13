import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
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
    const uploadTime = new Date().toISOString();
    const pathName = path.join(
      __dirname,
      `../images/${uploadTime}_${filename}`
    );

    const isUploaded: boolean = await new Promise((res, rej) =>
      createReadStream()
        .pipe(createWriteStream(pathName))
        .on('close', () => {
          console.log('closed');
          res(true);
        })
        .on('error', (err) => {
          console.log(err);
          rej(false);
        })
    );
    console.log(isUploaded);
    return isUploaded;
  }
}
/*
 * curl 'http://localhost:5000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:5000' --data-binary '{"query":"mutation AddPost($file: Upload!){\n  addPost(file)\n}"}' --compressed
 *
 */
