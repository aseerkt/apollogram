import Alert from '../components-ui/Alert';
import Spinner from '../components-ui/Spinner';
import { Post, useGetUserQuery } from '../generated/graphql';
import PostsGrid from './PostsGrid';

const UserPosts: React.FC<{ username: string }> = ({ username }) => {
  const { data, loading, error } = useGetUserQuery({
    variables: { username },
  });
  if (loading) {
    return <Spinner />;
  } else if (error) {
    console.log(error);
    <Alert severity='danger'>{JSON.stringify(error)}</Alert>;
  }
  const { posts } = data!.getUser!;
  return <PostsGrid posts={posts as Post[]} />;
};

export default UserPosts;
