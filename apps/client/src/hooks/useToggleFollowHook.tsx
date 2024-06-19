import { useToast } from '@/context/toast'
import { User } from '../gql/graphql'
import { ToggleFollowMutationDocument } from '../graphql/mutations'
import { useGqlMutation } from '../utils/react-query-gql'

const useToggleFollowHook = (user: User) => {
  const toast = useToast()
  const { mutate: toggleFollow, isPending } = useGqlMutation(
    ToggleFollowMutationDocument,
    {
      onSuccess: () => {
        toast(
          `${user.isFollowing ? 'Unfollowed' : 'Followed'} ${user.username}`
        )
      },
    }
  )

  const handleToggle = () => {
    toggleFollow({ followingId: user.id })
  }

  return { toggling: isPending, onToggle: handleToggle }
}

export default useToggleFollowHook
