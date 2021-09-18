import { useGetFollowSuggestionsQuery, User } from '../generated/graphql';
import FollowItem from './FollowItem';
import Spinner from '../components-ui/Spinner';

const Suggestions = () => {
  const { data, loading } = useGetFollowSuggestionsQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {data?.getFollowSuggestions.map((s) => (
        <FollowItem key={s.username + s.id} s={s as User} />
      ))}
      {!data?.getFollowSuggestions ||
        (data.getFollowSuggestions.length < 1 && <p>No Suggestions</p>)}
    </div>
  );
};

export default Suggestions;
