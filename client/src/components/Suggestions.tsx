import { useGetFollowSuggestionsQuery, User } from '../generated/graphql';
import FollowItem from './FollowItem';
import Spinner from '../shared/Spinner';

const Suggestions = () => {
  const { data, loading } = useGetFollowSuggestionsQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className='flex items-center justify-between py-3 '>
        <p className='font-bold text-gray-500'>Suggestions For You</p>
      </div>
      <div className='flex flex-col'>
        {data?.getFollowSuggestions.map((s) => (
          <FollowItem key={s.username + s.id} s={s as User} />
        ))}
        {!data?.getFollowSuggestions ||
          (data.getFollowSuggestions.length < 1 && <p>No Suggestions</p>)}
      </div>
    </div>
  );
};

export default Suggestions;
