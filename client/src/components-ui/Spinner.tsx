import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'default';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'default' }) => {
  const sizeFactor = size === 'default' ? '100px' : '50px';
  return (
    <img
      src='/loader.gif'
      alt='Loading...'
      height={sizeFactor}
      width={sizeFactor}
      className='m-auto max-h-96'
    />
  );
};

export default Spinner;
