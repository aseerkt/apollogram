type AvatarProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  size?: 'large' | 'small';
  customSize?: string | null;
};

const GRAVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000';

const Avatar: React.FC<AvatarProps> = ({
  size = 'small',
  customSize,
  src,
  className,
  ...props
}) => {
  let avatarSize = size === 'large' ? 'w-25 h-25' : 'w-10 h-10';

  if (customSize) avatarSize = customSize;
  return (
    <img
      loading='lazy'
      src={src ? src : GRAVATAR_PLACEHOLDER}
      alt='avatar'
      {...props}
      className={`${className} object-cover ring-1 ring-gray-200 rounded-full ${avatarSize}`}
    />
  );
};

export default Avatar;
