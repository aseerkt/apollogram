import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../components-ui/Avatar';
import Button from '../components-ui/Button';
import { User } from '../generated/graphql';
import useToggleFollowHook from '../utils/useToggleFollowHook';

interface SuggestionItemProps {
  s: User;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ s }) => {
  const { onToggle, toggling } = useToggleFollowHook(s);

  return (
    <div className='mt-3' key={s.id + s.username + s.id}>
      <div className='flex items-center mb-3'>
        <Avatar src={s.profile.imgURL} />
        <div className='flex flex-col ml-2 '>
          <Link className='font-bold hover:underline' to={`/u/${s.username}`}>
            {s.username}
          </Link>
          <small className='text-gray-500'>New to Instagram</small>
        </div>
        {s.isFollowing ? (
          <Button
            className='ml-auto text-sm'
            isLoading={toggling}
            onClick={onToggle}
          >
            {!toggling && <span className='text-black'>Following</span>}
          </Button>
        ) : (
          <Button
            className='ml-auto text-sm'
            isLoading={toggling}
            onClick={onToggle}
          >
            {!toggling && 'Follow'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuggestionItem;
