type AvatarProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  size?: 'large' | 'small';
  customSize?: string | null;
};

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
      src={src}
      alt='avatar'
      {...props}
      className={`${className} ring-1 ring-gray-200 rounded-full ${avatarSize}`}
    />
  );
};

export default Avatar;
