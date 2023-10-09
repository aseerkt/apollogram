import { Link } from 'react-router-dom';
import Avatar from '../shared/Avatar';
import { useMeQuery } from '../generated/graphql';
import Suggestions from './Suggestions';

const MiniProfileView: React.FC = () => {
  const { data: meData } = useMeQuery();

  const me = meData!.me!;

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

      <Suggestions />
    </>
  );
};

export default MiniProfileView;
