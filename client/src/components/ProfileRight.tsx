import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import Avatar from '../components-ui/Avatar';
import { MeDocument } from '../generated/graphql';
import Suggestions from './Suggestions';

const ProfileRight: React.FC = () => {
  const apolloClient = useApolloClient();
  const { me } = apolloClient.readQuery({ query: MeDocument });

  return (
    <>
      <div className='flex items-center py-3 mt-3'>
        <Link to={`/u/${me.username}`}>
          <Avatar className='w-16 h-16' src={me.imgURL} alt={me.username} />
        </Link>
        <div className='ml-4'>
          <Link to={`/u/${me.username}`}>
            <strong>{me.username}</strong>
          </Link>
          <p className='text-gray-600'>{me.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between py-3 '>
        <p className='font-bold text-gray-500'>Suggestions For You</p>
        <p className='font-semibold text-gray-800 cursor-pointer'>See All</p>
      </div>
      <div className='flex flex-col'>
        <Suggestions />
      </div>
    </>
  );
};

export default ProfileRight;
