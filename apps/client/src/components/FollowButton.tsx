import { FaCheck, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../gql/graphql'
import useToggleFollowHook from '../hooks/useToggleFollowHook'
import Button from '../shared/Button'

interface FollowButtonProps {
  user: User
  isCurrentUser: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({ user, isCurrentUser }) => {
  const { onToggle, toggling } = useToggleFollowHook(user)

  if (!user) {
    return null
  }

  return isCurrentUser ? (
    <Link to='/edit-profile'>
      <Button className='mt-3 md:ml-4 md:mt-0'>Edit Profile</Button>
    </Link>
  ) : user.isFollowing ? (
    <Button
      className='mt-3 md:ml-4 md:mt-0'
      isLoading={toggling}
      onClick={onToggle}
    >
      {!toggling && (
        <span className='flex items-center py-1'>
          <FaUser className='mr-1' />
          <FaCheck />
        </span>
      )}
    </Button>
  ) : (
    <Button
      color='dark'
      className='mt-3 md:ml-4 md:mt-0'
      isLoading={toggling}
      onClick={onToggle}
    >
      {!toggling && 'Follow'}
    </Button>
  )
}

export default FollowButton
