import path from 'path';
import crypto from 'crypto';
import fs, { existsSync } from 'fs';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { CLOUDINARY_ROOT_PATH, __prod__ } from '../constants';

export function generateFileName() {
  return crypto.randomBytes(15).toString('hex');
}

export async function uploadToCloudinary(
  file: FileUpload,
  pathSuffix?: 'profiles' | 'posts'
) {
  const { createReadStream } = await file;

  return new Promise<{ url: string }>((resolve, reject) => {
    const fileName = generateFileName();
    const filePath = `${CLOUDINARY_ROOT_PATH}/${pathSuffix}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        folder: filePath,
        format: 'jpg',
      },
      (err, res) => {
        console.log(res);
        if (res) {
          resolve({
            url: cloudinary.url(`${filePath}/${fileName}`, { width: 600 }),
          });
        } else {
          reject(err);
        }
      }
    );
    createReadStream()
      .pipe(stream)
      .on('error', (err) => reject(err));
  });
}

async function createBuffer(file: FileUpload) {
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
}

async function uploadFile(
  file: FileUpload,
  pathPrefix?: string
): Promise<{ isUploaded: boolean; imgURL: string }> {
  // Create buffer for minimising
  const buffer = await createBuffer(file);
  if (!buffer) return { isUploaded: false, imgURL: '' };

  // constructing file name to be saved
  const pathName = `public/images/${pathPrefix}/${generateFileName()}`;
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

export default uploadFile;
