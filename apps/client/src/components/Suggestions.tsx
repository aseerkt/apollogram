import { User } from '../gql/graphql'
import { GetFollowSuggestionsQueryDocument } from '../graphql/queries'
import { useMeQuery } from '../hooks/useMeQuery'
import Spinner from '../shared/Spinner'
import { useGqlQuery } from '../utils/react-query-gql'
import FollowItem from './FollowItem'

const Suggestions = () => {
  const { currentUser } = useMeQuery()
  const { data, isFetching } = useGqlQuery(
    GetFollowSuggestionsQueryDocument,
    {}
  )

  let content: JSX.Element | JSX.Element[]

  if (isFetching) {
    content = <Spinner />
  } else if (!data?.getFollowSuggestions.length) {
    content = <p>No Suggestions</p>
  } else {
    content = data.getFollowSuggestions.map((user) => (
      <FollowItem
        key={user.username + user.id}
        s={user as User}
        isCurrentUser={currentUser?.id === user.id}
      />
    ))
  }

  return (
    <div>
      <div className='flex items-center justify-between py-3'>
        <p className='font-bold text-gray-500'>Suggestions For You</p>
      </div>
      <div className='flex flex-col'>{content}</div>
    </div>
  )
}

export default Suggestions
