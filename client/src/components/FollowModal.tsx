import { FaTimes } from 'react-icons/fa';
import Modal from '../components-ui/Modal';
import Spinner from '../components-ui/Spinner';
import { FollowEnum, useGetFollowsQuery, User } from '../generated/graphql';
import SuggestionItem from './SuggestionItem';

interface FollowModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  modalTitle: FollowEnum;
}

const FollowModal: React.FC<FollowModalProps> = ({
  isOpen,
  setIsOpen,
  modalTitle,
  username,
}) => {
  const { data, loading } = useGetFollowsQuery({
    variables: { selector: modalTitle, username },
    fetchPolicy: 'network-only',
  });
  if (loading && isOpen) {
    return <Spinner />;
  }

  return (
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
        <div className='px-3'>
          {data?.getFollows?.map((u) => (
            <SuggestionItem darkFollowButton s={u as User} />
          ))}
          {!data?.getFollows ||
            (data.getFollows.length === 0 && (
              <p className='py-3'>You have no {modalTitle.toLowerCase()}</p>
            ))}
        </div>
      </main>
    </Modal>
  );
};

export default FollowModal;
