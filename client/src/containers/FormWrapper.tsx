import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Card from '@/shared/Card';

interface FormWrapperProps {
  title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => {
  return (
    <div className='w-screen mt-5 justify-content-center'>
      <div className='max-w-screen-sm mx-auto w-96'>
        <Card>
          <div className='flex flex-col items-center justify-center p-4 bg-gray-100'>
            <Link to='/' className='flex items-center justify-center'>
              <FaInstagram size='4em' />
              <h1 className='mb-0 ml-2 text-4xl font-bold d-inline'>
                Instagram
              </h1>
            </Link>
            <h2 className='text-2xl font-semibold text-center text-gray-900'>
              {title}
            </h2>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default FormWrapper;
