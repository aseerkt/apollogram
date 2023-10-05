import Alert from '../shared/Alert';
import Spinner from '../shared/Spinner';
import { Post, useGetUserQuery } from '../generated/graphql';
import PostsGrid from './PostsGrid';

const UserPosts: React.FC<{ username: string }> = ({ username }) => {
  const { data, loading, error } = useGetUserQuery({
    variables: { username },
  });
  if (loading) {
    return <Spinner />;
  } else if (error) {
    // console.log(error);
    <Alert severity='danger'>{JSON.stringify(error)}</Alert>;
  }
  return data?.getUser?.posts ? (
    <PostsGrid posts={data.getUser.posts as Post[]} />
  ) : null;
};

export default UserPosts;
