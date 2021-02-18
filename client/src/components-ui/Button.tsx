import React from 'react';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: 'light' | 'dark';
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  color = 'light',
  children,
  fullWidth = false,
  className,
  ...props
}) => {
  const disabledStyle = props.disabled ? 'cursor-not-allowed opacity-40' : '';
  const buttonColor =
    color === 'light'
      ? 'bg-white border border-grey-100 text-blue-700 hover:bg-gray-100'
      : 'bg-blue-500 text-white hover:bg-blue-700';
  return (
    <button
      {...props}
      className={`${className} ${buttonColor} ${
        fullWidth ? 'w-full' : ''
      } px-3 py-1 shadow rounded-md font-bold outline-none focus:outline-none ${disabledStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
