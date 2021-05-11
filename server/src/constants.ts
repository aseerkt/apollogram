export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'instaToken';
export const EXPRESS_ENDPOINT = process.env.EXPRESS_ENDPOINT!;
export const GRAVATAR =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
export const CLOUDINARY_ROOT_PATH = `apollo-instagram/${
  __prod__ ? 'prod' : 'dev'
}`;
