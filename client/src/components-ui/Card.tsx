import React from 'react';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`${className} overflow-hidden border border-gray-300 bg-white rounded `}
    >
      {children}
    </div>
  );
};

export default Card;
