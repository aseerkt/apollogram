import React from 'react';
import AddPost from '../components/AddPost';
import PostCard from '../components/PostCard';
import Container from '../components-ui/Container';
import { Post, useGetPostsQuery } from '../generated/graphql';
import Spinner from '../components-ui/Spinner';
import Alert from '../components-ui/Alert';

const Posts: React.FC = () => {
  const { data, loading, error } = useGetPostsQuery();
  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <Alert>{error.message}</Alert>;
  }
  return (
    <Container>
      <div className='flex justify-between w-full pt-15'>
        <div className='w-8/12'>
          {data &&
            data.getPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
        <div className=''>
          <AddPost />
        </div>
      </div>
    </Container>
  );
};

export default Posts;
