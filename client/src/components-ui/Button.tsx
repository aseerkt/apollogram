import React from 'react';
import cn from 'classnames';
import { ButtonLoader } from './ButtonLoader';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: 'light' | 'dark';
  fullWidth?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = 'light',
  fullWidth = false,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.disabled || isLoading}
      className={cn(
        'px-3 py-1 shadow rounded-md font-bold flex justify-center items-center focus:outline-none',
        {
          'cursor-not-allowed opacity-40': props.disabled,
          'w-full': fullWidth,
          'bg-white border border-grey-100 text-blue-700 hover:bg-gray-100':
            color === 'light',
          'bg-blue-500 text-white hover:bg-blue-700': color === 'dark',
        },
        className
      )}
    >
      {isLoading && <ButtonLoader />}
      <div>{children}</div>
    </button>
  );
};

export default Button;
