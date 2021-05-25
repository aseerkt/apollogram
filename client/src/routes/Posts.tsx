import React from 'react';
import PostCard from '../components/PostCard';
import Container from '../components-ui/Container';
import { Post, useGetPostsQuery } from '../generated/graphql';
import Spinner from '../components-ui/Spinner';
import Alert from '../components-ui/Alert';
import ProfileRight from '../components/ProfileRight';
import { Link } from 'react-router-dom';

const Posts: React.FC = () => {
  const [observedPost, setObservedPost] = React.useState('');
  const { data, loading, error, fetchMore, variables } = useGetPostsQuery({
    variables: { limit: 4 },
  });

  React.useEffect(() => {
    if (data) {
      const posts = data.getPosts.posts;
      if (!posts || posts.length === 0) return;

      const id = posts[posts.length - 1].id;
      if (!data.getPosts.hasMore) return;

      if (id !== observedPost) {
        setObservedPost(id);
        observeElement(document.getElementById(id)!);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getPosts.posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          // console.log('Reached bottom of post');
          fetchMore({
            variables: {
              limit: variables?.limit,
              offset: data?.getPosts.posts.length || 0,
            },
          });
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
  };

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <Container>
      <div className='flex flex-wrap justify-between w-full pt-15'>
        {data && data.getPosts.posts.length > 0 ? (
          <>
            <div className='md:w-8/12 sm:w-full'>
              {data.getPosts.posts.map((post) => (
                <PostCard key={post.id} post={post as Post} />
              ))}
            </div>
            <div className='relative flex-1 hidden md:block md:ml-4'>
              {data && data.getPosts.posts.length > 0 && <ProfileRight />}
            </div>
          </>
        ) : (
          <div className='w-full mx-auto sm:w-9/12 md:w-6/12'>
            <h1 className='text-lg font-bold'>No Posts from your followings</h1>
            <p>
              Follow more people or{' '}
              <Link className='text-blue-600' to='/explore'>
                Explore
              </Link>
            </p>
            <ProfileRight />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Posts;
