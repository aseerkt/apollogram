import Card from '@/shared/Card'
import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface AuthFormWrapperProps {
  title: string
  children: React.ReactNode
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  children,
  title,
}) => {
  return (
    <div className='justify-content-center mt-5 w-screen'>
      <div className='mx-auto w-96 max-w-screen-sm'>
        <Card>
          <div className='flex flex-col items-center justify-center bg-gray-100 p-4'>
            <Link
              to='/'
              className='mb-2 flex items-center justify-center space-x-2'
            >
              <FaInstagram size='2em' />
              <h1 style={{ fontFamily: 'Grand Hotel', fontSize: '2rem' }}>
                Apollogram
              </h1>
            </Link>
            <h2 className='text-center text-xl font-semibold text-gray-900'>
              {title}
            </h2>
          </div>
          {children}
        </Card>
      </div>
    </div>
  )
}

export default AuthFormWrapper
