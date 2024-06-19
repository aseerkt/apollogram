import { Link } from 'react-router-dom'
import { useMeQuery } from '../hooks/useMeQuery'
import Avatar from '../shared/Avatar'
import Suggestions from './Suggestions'

const MiniProfileView: React.FC = () => {
  const { currentUser } = useMeQuery()

  return (
    <>
      <div className='mt-3 flex items-center py-3'>
        <Link to={`/u/${currentUser!.username}`}>
          <Avatar
            className='h-16 w-16'
            src={currentUser!.imgURL}
            alt={currentUser!.username}
          />
        </Link>
        <div className='ml-4'>
          <Link to={`/u/${currentUser!.username}`}>
            <strong>{currentUser!.username}</strong>
          </Link>
          <p className='text-gray-600'>{currentUser!.name}</p>
        </div>
      </div>

      <Suggestions />
    </>
  )
}

export default MiniProfileView
