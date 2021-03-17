import path from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { FileUpload } from 'graphql-upload';

export async function uploadFile(file: FileUpload, pathPrefix: string) {
  const { filename, createReadStream } = await file;
  const uploadTime = new Date().toISOString();
  const pathName = path.join(
    __dirname,
    '../images',
    pathPrefix,
    `${uploadTime}_${filename}`
  );
  const dirname = path.dirname(pathName);
  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true });
  }
  const imgURL = `/images/${pathPrefix}/${uploadTime}_${filename}`;
  const writeStream = createWriteStream(pathName);

  const isUploaded: boolean = await new Promise(async (res, rej) =>
    createReadStream()
      .pipe(writeStream)
      .on('close', () => {
        console.log('closed');
        res(true);
      })
      .on('error', (err) => {
        console.log(err);
        rej(false);
      })
  );
  return { isUploaded, imgURL };
}
