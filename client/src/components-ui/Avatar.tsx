import React from 'react';

type AvatarProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  size?: 'large' | 'small';
};

const Avatar: React.FC<AvatarProps> = ({
  size = 'small',
  src = '/user.jpeg',
  ...props
}) => {
  const avatarSize = size === 'large' ? '400' : '60';
  const imgSrc =
    src === '/user.jpeg' ? src : `${process.env.REACT_APP_EXPRESS_URI}${src}`;
  return (
    <img
      src={imgSrc}
      height={avatarSize}
      style={{ borderRadius: '50%' }}
      width={avatarSize}
      alt='avatar'
      {...props}
    />
  );
};

export default Avatar;
