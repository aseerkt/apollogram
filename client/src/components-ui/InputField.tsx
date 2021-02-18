import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

type InterfaceProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  error: string | null;
  label: string;
  focusOnRender?: boolean;
  inline?: boolean;
  labelClassName?: string;
  helperText?: string;
};

const InputField: React.FC<InterfaceProps> = ({
  error,
  label,
  focusOnRender,
  inline,
  labelClassName,
  helperText,
  ref,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusOnRender) {
      inputRef.current?.focus();
    }
  }, [focusOnRender]);

  return (
    <div
      className={cn('mb-5', {
        'md:grid md:grid-cols-2-form gap-10 ': inline,
      })}
    >
      <label
        className={cn('mb-1 font-bold inline-block', labelClassName, {
          'md:text-right w-full': inline,
        })}
        htmlFor={props.name}
      >
        {label}
      </label>
      <div>
        <input
          className={cn('w-full px-2 mb-3 py-1  rounded-md  ', {
            'border-2 border-red-500 bg-red-100': !!error,
            'bg-blue-50 border border-gray-300 focus:border-gray-500': !error,
          })}
          {...props}
          ref={inputRef}
          autoComplete={props.type === 'password' ? 'new-password' : ''}
        />
        <small className='block leading-4 text-gray-500'>{helperText}</small>
        <small className='my-1 text-red-700'>{error}</small>
      </div>
    </div>
  );
};

export default InputField;
