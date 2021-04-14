import path from 'path';
import fs, { existsSync } from 'fs';
import sharp from 'sharp';
import { FileUpload } from 'graphql-upload';

const createBuffer = async (file: FileUpload) => {
  const { createReadStream } = await file;
  const buffers: Uint8Array[] = [];
  return await new Promise<Buffer | null>(async (res) =>
    createReadStream()
      .on('data', (chunk) => {
        buffers.push(chunk as Buffer);
      })
      .on('end', () => {
        res(Buffer.concat(buffers));
      })
      .on('error', (err) => {
        console.log(err);
        res(null);
      })
  );
};

export async function uploadFile(
  file: FileUpload,
  pathPrefix: string
): Promise<{ isUploaded: boolean; imgURL: string }> {
  // Create buffer for minimising
  const buffer = await createBuffer(file);
  if (!buffer) return { isUploaded: false, imgURL: '' };

  const { filename } = await file;

  // constructing file name to be saved
  const uploadTime = new Date().toISOString();
  const pathName = `public/images/${pathPrefix}/${uploadTime}_${filename}`;
  const dirname = path.dirname(pathName);
  if (!existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
  const imgURL = pathName.replace('public/', '');

  // converting to jpg and minimising file
  try {
    await sharp(buffer)
      .resize(pathPrefix === 'profile' ? 50 : 600)
      .jpeg()
      .toFile(pathName);

    return { isUploaded: true, imgURL };
  } catch (err) {
    console.log(err);
    return { isUploaded: false, imgURL };
  }
}
