import { useToast } from '@/context/toast'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { ToggleLikeMutationDocument } from '../graphql/mutations'
import { useGqlMutation } from '../utils/react-query-gql'

interface LikeButtonProps {
  postId: string
  userLike: boolean
}

const TOGGLE_LIKE_FAIL_MESSAGE = 'Unable to toggle like for post'

const LikeButton: React.FC<LikeButtonProps> = ({ postId, userLike }) => {
  const toast = useToast()

  const { mutate: toggleLike } = useGqlMutation(ToggleLikeMutationDocument, {
    onSuccess: (data) => {
      if (data.toggleLike) {
        // TODO: invalidate cache
      }
    },
  })

  const likeAction = async () => {
    try {
      toggleLike({ postId })
    } catch (err) {
      toast(TOGGLE_LIKE_FAIL_MESSAGE)
    }
  }

  return (
    <button onClick={likeAction}>
      {userLike ? (
        <BsHeartFill
          size='1.9em'
          className='transform cursor-pointer text-red-600 duration-150 active:scale-110'
        />
      ) : (
        <BsHeart
          size='1.9em'
          className='transform cursor-pointer duration-150 active:scale-110'
        />
      )}
    </button>
  )
}

export default LikeButton
