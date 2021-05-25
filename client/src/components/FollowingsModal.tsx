import { useState } from 'react';
import { FollowEnum } from '../generated/graphql';
import FollowModal from './FollowModal';

interface FollowingsModalProps {
  followingsCount: number;
  username: string;
}

const FollowingsModal: React.FC<FollowingsModalProps> = ({
  followingsCount,
  username,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          if (followingsCount > 0) setIsOpen(!isOpen);
        }}
        className='md:flex'
      >
        <strong className='md:mr-1'>{followingsCount}</strong>
        <p className='text-gray-600 md:text-black'>following</p>
      </button>
      <FollowModal
        modalTitle={FollowEnum.Followings}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
      />
    </>
  );
};

export default FollowingsModal;
