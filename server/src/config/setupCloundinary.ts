import { v2 as cloudinary } from 'cloudinary';

function setupCloundinary() {
  if (typeof process.env.CLOUDINARY_URL === 'undefined') {
    console.warn('!! cloudinary config is undefined !!');
    console.warn('export CLOUDINARY_URL or set dotenv file');
    process.exit(1);
  } else {
    console.log('Cloudinary URL is found'.green.bold);
    cloudinary.config({});
  }
}
export default setupCloundinary;
