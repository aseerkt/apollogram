import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { RiChat3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Alert from '../components-ui/Alert';
import Spinner from '../components-ui/Spinner';
import { useGetUserQuery } from '../generated/graphql';

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
  return (
    <section className='grid grid-cols-2 gap-1 mt-2 md:grid-cols-3 md:gap-4'>
      {posts.length === 0 && (
        <strong className='col-start-2 text-gray-500'>No Posts Uploaded</strong>
      )}
      {posts.map(({ imgURL, comments, likeCount, id }) => (
        <Link key={id} className='relative w-full h-32 md:h-64' to={`/p/${id}`}>
          <img
            className='z-10 object-cover w-full h-full'
            src={imgURL}
            alt=''
          />
          <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full text-lg text-white text-opacity-100 bg-black opacity-0 bg-opacity-30 hover:opacity-100'>
            <div className='flex items-center'>
              <div className='z-30 flex items-center mr-2'>
                <AiFillHeart />
                <strong className='ml-1'>{likeCount}</strong>
              </div>
              <div className='z-30 flex items-center ml-2'>
                <RiChat3Fill />
                <strong className='ml-1'>{comments.length}</strong>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default UserPosts;
