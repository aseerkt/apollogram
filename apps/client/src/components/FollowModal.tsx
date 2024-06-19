import { useMemo } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router'
import { User } from '../gql/graphql'
import {
  GetFollowsQueryDocument,
  GetUserQueryDocument,
} from '../graphql/queries'
import { useDisclosure } from '../hooks/useDisclosure'
import { useMeQuery } from '../hooks/useMeQuery'
import Modal from '../shared/Modal'
import Spinner from '../shared/Spinner'
import { useGqlQuery } from '../utils/react-query-gql'
import FollowItem from './FollowItem'

interface FollowModalProps {
  modalTitle: 'Followers' | 'Followings'
}

const FollowModal: React.FC<FollowModalProps> = ({ modalTitle }) => {
  const { isOpen, toggle } = useDisclosure(false)
  const { username } = useParams<{ username: string }>()
  const { currentUser } = useMeQuery()
  const { data: userData } = useGqlQuery(GetUserQueryDocument, {
    variables: { username: username! },
  })
  const userId = userData?.getUser?.id
  const { data, isFetching: loading } = useGqlQuery(GetFollowsQueryDocument, {
    variables: {
      userId: userId!,
    },
    enabled: Boolean(userId),
  })

  const follows = useMemo(
    () =>
      modalTitle === 'Followers'
        ? data?.getFollows?.followers
        : data?.getFollows?.followings,
    [data, modalTitle]
  )

  if (loading && isOpen) {
    return <Spinner />
  }

  return (
    <>
      <button onClick={toggle} disabled={!follows?.length} className='md:flex'>
        <strong className='md:mr-1'>{follows?.length || 0}</strong>
        <p className='text-gray-600 md:text-black'>
          {modalTitle.toLowerCase()}
        </p>
      </button>
      <Modal isOpen={isOpen} onClose={toggle}>
        <main className='rounded-md bg-white'>
          <header className='flex items-center justify-between border-b-2 p-3'>
            <div></div>
            <h1 className='font-bold'>{modalTitle}</h1>
            <FaTimes
              className='ml-auto cursor-pointer'
              size='1.2em'
              role='button'
              onClick={toggle}
            />
          </header>
          <div className='h-96 max-h-96 overflow-y-auto px-3'>
            {follows?.map((u) => (
              <FollowItem
                key={`follow_${u.id}`}
                darkFollowButton
                s={u as User}
                isCurrentUser={u.id === currentUser?.id}
              />
            ))}
            {follows?.length === 0 && (
              <p className='py-3'>You have no {modalTitle.toLowerCase()}</p>
            )}
          </div>
        </main>
      </Modal>
    </>
  )
}

export default FollowModal
