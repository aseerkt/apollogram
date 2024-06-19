import { Link } from 'react-router-dom'
import { User } from '../gql/graphql'
import useToggleFollowHook from '../hooks/useToggleFollowHook'
import Avatar from '../shared/Avatar'
import Button from '../shared/Button'

interface FollowItemProps {
  s: User
  isCurrentUser: boolean
  darkFollowButton?: boolean
}

const FollowItem: React.FC<FollowItemProps> = ({
  s,
  isCurrentUser,
  darkFollowButton = false,
}) => {
  const { onToggle, toggling } = useToggleFollowHook(s)

  return (
    <div className='mt-3' key={s.id + s.username + s.id}>
      <div className='flex items-center pb-2'>
        <Avatar src={s.imgURL} />
        <div className='ml-2 flex flex-col'>
          <Link className='font-bold hover:underline' to={`/u/${s.username}`}>
            {s.username}
          </Link>
          <small className='text-gray-500'>New to Instagram</small>
        </div>
        {isCurrentUser ? (
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
  )
}

export default FollowItem
