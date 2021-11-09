import { Link } from 'react-router-dom';
import Avatar from '../components-ui/Avatar';
import Button from '../components-ui/Button';
import { useMeQuery, User } from '../generated/graphql';
import useToggleFollowHook from '../hooks/useToggleFollowHook';

interface SuggestionItemProps {
  s: User;
  darkFollowButton?: boolean;
}

const FollowItem: React.FC<SuggestionItemProps> = ({
  s,
  darkFollowButton = false,
}) => {
  const { onToggle, toggling } = useToggleFollowHook(s);
  const { data: meData } = useMeQuery();
  const me = meData!.me!;

  return (
    <div className='mt-3' key={s.id + s.username + s.id}>
      <div className='flex items-center pb-2'>
        <Avatar src={s.imgURL} />
        <div className='flex flex-col ml-2'>
          <Link className='font-bold hover:underline' to={`/u/${s.username}`}>
            {s.username}
          </Link>
          <small className='text-gray-500'>New to Instagram</small>
        </div>
        {s.username === me.username ? (
          <Button className='ml-auto text-sm' color='dark' disabled>
            You
          </Button>
        ) : s.isFollowing ? (
          <Button
            className='ml-auto text-sm'
            isLoading={toggling}
            onClick={onToggle}
          >
            {!toggling && <span className='text-black'>Following</span>}
          </Button>
        ) : (
          <Button
            color={darkFollowButton ? 'dark' : 'light'}
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

export default FollowItem;
