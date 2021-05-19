import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../components-ui/Avatar';
import Card from '../components-ui/Card';
import Container from '../components-ui/Container';
import Spinner from '../components-ui/Spinner';
import AddComment from '../components/AddComment';
import PostActions from '../components/PostActions';
import PostOptions from '../components/PostOptions';
import { Post, useGetSinglePostQuery } from '../generated/graphql';

const SinglePost = () => {
  const { postId }: any = useParams();
  const { data, loading } = useGetSinglePostQuery({ variables: { postId } });

  // const { me } = apolloClient.readQuery({ query: MeDocument });
  const addCommentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (loading) return <Spinner />;
  if (data && data.getSinglePost) {
    const {
      id,
      user,
      caption,
      comments,
      likeCount,
      userLike,
      createdAt,
      imgURL,
    } = data.getSinglePost;

    return (
      <Container>
        <Card className='relative mb-10 min-h-450'>
          {/* header */}
          <header className='static top-0 right-0 flex items-center justify-between h-20 px-3 border-b border-gray-300 md:border-l md:absolute md:w-80'>
            <div className='flex items-center'>
              <Link to={`/u/${user.username}`} className='flex items-center'>
                <Avatar
                  className='my-2 cursor-pointer'
                  src={user.profile.imgURL}
                />
                <span className='ml-2 font-semibold'>{user.username}</span>
              </Link>
            </div>
            {/* TODO Icon Button */}
            <PostOptions post={data.getSinglePost as Post} />
          </header>
          {/* Media */}
          <div className='md:h-full md:mr-80'>
            <img
              className='w-full mr-0 md:w-full md:object-cover md:h-full'
              src={imgURL}
              alt=''
            />
          </div>
          <div className='static bottom-0 right-0 flex flex-col justify-between md:border-l md:border-gray-300 md:absolute top-20 md:w-80'>
            <div className='flex flex-col justify-between h-full pt-2'>
              {/* Post Caption */}
              <div className='px-3 overflow-y-auto min-h-48'>
                <div className='flex mb-3'>
                  <Link
                    to={`/u/${user.username}`}
                    className='mr-2 font-semibold '
                  >
                    <Avatar
                      className='my-2 cursor-pointer ring-2 ring-red-500'
                      src={user.profile.imgURL}
                    />
                  </Link>
                  <div className='flex flex-col mt-2'>
                    <div>
                      <Link
                        to={`/u/${user.username}`}
                        className='inline-block mr-1 font-semibold hover:underline'
                      >
                        {user.username}
                      </Link>
                      <span>{caption}</span>
                    </div>
                    <span className='mt-2 text-sm text-gray-400'>
                      {dayjs(createdAt).fromNow(true)}
                    </span>
                  </div>
                </div>

                {/* Comments */}
                <div className='my-1 comments-container'>
                  {comments.map((c) => (
                    <div key={c.id} className='flex'>
                      <Link
                        to={`/u/${c.username}`}
                        className='mr-2 font-semibold '
                      >
                        <Avatar
                          className='my-2 cursor-pointer'
                          src={c.user.profile.imgURL}
                        />
                      </Link>
                      <div className='flex flex-col mt-2'>
                        <div className='flex'>
                          <Link
                            to={`/u/${c.username}`}
                            className='flex mr-1 font-semibold hover:underline'
                          >
                            {c.username}
                          </Link>
                          <span>{c.text}</span>
                        </div>
                        <span className='mt-2 text-sm text-gray-400'>
                          {dayjs(c.createdAt).fromNow(true)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Like And Comment Button */}
              <div>
                <PostActions
                  className='p-3'
                  postId={id}
                  addCommentRef={addCommentRef}
                  userLike={userLike}
                />
                {/* Like Count */}
                <p className='px-3 font-semibold'>
                  {likeCount} like{likeCount === 1 ? '' : 's'}
                </p>
                {/* TimeStamp */}
                <Link
                  to={`/p/${id}`}
                  className='px-3 py-1 text-xs text-gray-500 uppercase'
                >
                  {dayjs(createdAt).fromNow()}
                </Link>
                <AddComment customRef={addCommentRef} postId={id} />
              </div>
            </div>
          </div>
        </Card>
      </Container>
    );
  }
  return null;
};

export default SinglePost;
