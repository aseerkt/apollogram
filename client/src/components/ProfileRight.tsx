import React from 'react';
import { Link } from 'react-router-dom';
import { apolloClient } from '../utils/apolloClient';
import Avatar from '../components-ui/Avatar';
// import Button from '../components-ui/Button';
import { MeDocument } from '../generated/graphql';

const ProfileRight: React.FC = () => {
  const { me } = apolloClient.readQuery({ query: MeDocument });

  return (
    <>
      <div className='flex items-center py-3 mt-3'>
        <Link to={`/u/${me.username}`}>
          <Avatar
            className='w-16 h-16'
            src={me.profile.imgURL}
            alt={me.username}
          />
        </Link>
        <div className='ml-4'>
          <Link to={`/u/${me.username}`}>
            <strong>{me.username}</strong>
          </Link>
          <p className='text-gray-600'>{me.profile.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between py-3 '>
        <p className='font-bold text-gray-500'>Suggestions For You</p>
        <p className='font-semibold text-gray-800 cursor-pointer'>See All</p>
      </div>
      <div className='flex flex-col'>
        <h2>Upcoming</h2>
        {/* {data && data.getFollowSuggestions ? (
          data.getFollowSuggestions.map(({ username, profile: { imgURL } }) => (
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar className='mx-3' src={imgURL} alt='Profile Picture' />
                <div className='flex flex-col justify-center'>
                  <Link to={`/u/${username}`}>
                    <span className='text-sm font-semibold hover:underline'>
                      {username}
                    </span>
                  </Link>
                  <p className='text-sm text-gray-400'>Suggested for you</p>
                </div>
              </div>
              <button className='text-sm font-semibold text-blue-500 border-none shadow-none'>
                Follow
              </button>
            </div>
          ))
        ) : (
          <p>No Suggestions</p>
        )} */}
      </div>
    </>
  );
};

export default ProfileRight;
