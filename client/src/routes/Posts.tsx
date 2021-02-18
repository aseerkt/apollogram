import React from 'react';
import PostCard from '../components/PostCard';
import Container from '../components-ui/Container';
import { Post, useGetPostsQuery } from '../generated/graphql';
import Spinner from '../components-ui/Spinner';
import Alert from '../components-ui/Alert';
import ProfileRight from '../components/ProfileRight';

const Posts: React.FC = () => {
  const { data, loading, error } = useGetPostsQuery();
  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <Alert>{error.message}</Alert>;
  }
  return (
    <Container>
      <div className='flex flex-wrap justify-between w-full pt-15'>
        <div className='md:w-8/12 sm:w-full'>
          {data &&
            data.getPosts.map((post) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
        </div>
        <div className='relative flex-1 md:ml-4'>
          <ProfileRight />
        </div>
      </div>
    </Container>
  );
};

export default Posts;
