import React from 'react';

type InterfaceProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error: string | null;
};

const InputField: React.FC<InterfaceProps> = ({ error, ...props }) => {
  return (
    <div className='mb-4'>
      <input
        className='w-full px-2 py-1 border border-gray-300 rounded-md bg-blue-50 focus:border-gray-500'
        {...props}
        autoComplete={props.type === 'password' ? 'new-password' : ''}
      />
      <small className='my-1 text-red-700'>{error}</small>
    </div>
  );
};

export default InputField;
