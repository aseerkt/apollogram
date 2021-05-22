import { useGetFollowSuggestionsQuery, User } from '../generated/graphql';
import SuggestionItem from './SuggestionItem';
import Spinner from '../components-ui/Spinner';

const Suggestions = () => {
  const { data, loading } = useGetFollowSuggestionsQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {data &&
        data.getFollowSuggestions.map((s) => (
          <SuggestionItem key={s.username + s.id} s={s as User} />
        ))}
    </div>
  );
};

export default Suggestions;
