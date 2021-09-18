import { useEffect, useState } from 'react';
import Alert from '../components-ui/Alert';
import Container from '../components-ui/Container';
import Spinner from '../components-ui/Spinner';
import PostsGrid from '../components/PostsGrid';
import { Post, useGetExplorePostsQuery } from '../generated/graphql';

const Explore = () => {
  const [observedPost, setObservedPost] = useState('');
  const { data, loading, error, fetchMore, variables } =
    useGetExplorePostsQuery({
      variables: { limit: 12 },
    });

  useEffect(() => {
    if (data) {
      const posts = data.getExplorePosts.posts;
      if (!posts || posts.length === 0) return;

      const id = posts[posts.length - 1].id;

      if (id !== observedPost) {
        setObservedPost(id);
        observeElement(document.getElementById(id)!);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getExplorePosts.posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          // console.log('Reached bottom of post');
          fetchMore({
            variables: {
              limit: variables?.limit,
              offset: data?.getExplorePosts.posts.length || 0,
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
      {data?.getExplorePosts.posts && (
        <PostsGrid posts={data.getExplorePosts.posts as Post[]} />
      )}
    </Container>
  );
};

export default Explore;
