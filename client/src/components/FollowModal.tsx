import { useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router';
import Modal from '../shared/Modal';
import Spinner from '../shared/Spinner';
import {
  useGetFollowsQuery,
  useGetUserQuery,
  User,
} from '../generated/graphql';
import FollowItem from './FollowItem';

interface FollowModalProps {
  modalTitle: 'Followers' | 'Followings';
}

const FollowModal: React.FC<FollowModalProps> = ({ modalTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useParams<{ username: string }>();
  const { data, loading } = useGetFollowsQuery({
    variables: { username },
    skip: typeof username !== 'string',
  });
  const follows = useMemo(
    () =>
      modalTitle === 'Followers'
        ? data?.getFollows?.followers
        : data?.getFollows?.followings,
    [data, modalTitle]
  );

  if (loading && isOpen) {
    return <Spinner />;
  }

  return (
    <>
      <button
        onClick={() => {
          if (follows?.length) setIsOpen(!isOpen);
        }}
        className='md:flex'
      >
        <strong className='md:mr-1'>{follows?.length}</strong>
        <p className='text-gray-600 md:text-black'>
          {modalTitle.toLowerCase()}
        </p>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <main className='bg-white rounded-md'>
          <header className='flex items-center justify-between p-3 border-b-2'>
            <div> </div>
            <h1 className='font-bold'>{modalTitle}</h1>
            <FaTimes
              className='ml-auto cursor-pointer'
              size='1.2em'
              onClick={() => setIsOpen(false)}
            />
          </header>
          <div className='px-3 overflow-y-auto max-h-96 h-96'>
            {follows?.map((u) => (
              <FollowItem
                key={`follow_${u.id}`}
                darkFollowButton
                s={u as User}
              />
            ))}
            {follows?.length === 0 && (
              <p className='py-3'>You have no {modalTitle.toLowerCase()}</p>
            )}
          </div>
        </main>
      </Modal>
    </>
  );
};

export default FollowModal;
