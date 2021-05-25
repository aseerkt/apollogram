import { useState } from 'react';
import { FollowEnum } from '../generated/graphql';
import FollowModal from './FollowModal';

interface FollowersModalProps {
  followersCount: number;
  username: string;
}

const FollowersModal: React.FC<FollowersModalProps> = ({
  followersCount,
  username,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          if (followersCount > 0) setIsOpen(!isOpen);
        }}
        className='md:flex'
      >
        <strong className='md:mr-1'>{followersCount}</strong>
        <p className='text-gray-600 md:text-black'>followers</p>
      </button>
      <FollowModal
        modalTitle={FollowEnum.Followers}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
      />
    </>
  );
};

export default FollowersModal;
