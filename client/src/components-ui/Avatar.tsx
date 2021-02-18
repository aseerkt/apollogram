import React from 'react';

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
  src = '/user.jpg',
  className,
  ...props
}) => {
  let avatarSize = size === 'large' ? '25' : '10';
  const imgSrc =
    src === '/user.jpg' ? src : `${process.env.REACT_APP_EXPRESS_URI}${src}`;

  if (customSize) avatarSize = customSize;
  return (
    <img
      src={imgSrc}
      style={{ borderRadius: '50%' }}
      alt='avatar'
      {...props}
      className={`${className}  w-${avatarSize} h-${avatarSize}`}
    />
  );
};

export default Avatar;
