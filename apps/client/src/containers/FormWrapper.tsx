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
            <Link
              to='/'
              className='flex items-center justify-center space-x-2 mb-2'
            >
              <FaInstagram size='2em' />
              <h1 style={{ fontFamily: 'Grand Hotel', fontSize: '2rem' }}>
                Apollogram
              </h1>
            </Link>
            <h2 className='text-xl font-semibold text-center text-gray-900'>
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
