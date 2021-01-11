import React from 'react';
import { Link } from 'react-router-dom';
import { apolloClient } from '..';
import Avatar from '../components-ui/Avatar';
import Container from '../components-ui/Container';
import DropDown from '../components-ui/DropDown';
import { MeDocument, useLogoutMutation } from '../generated/graphql';

const Navbar: React.FC = () => {
  const [logout] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout) {
        apolloClient.resetStore();
        document.location.pathname = '/';
      }
    },
  });
  const { me } = apolloClient.readQuery({ query: MeDocument });
  return (
    <nav className='fixed inset-x-0 top-0 z-10 h-12 bg-white border border-gray-200 shadow'>
      <Container className='flex items-center h-full px-2'>
        <Link to='/'>
          <h1 className='text-2xl'>Instagram</h1>
        </Link>
        {me && (
          <>
            <DropDown>
              <Avatar
                className='w-8 h-8 my-auto ml-auto cursor-pointer'
                title={me.username}
                src={me.imgURL}
              />
            </DropDown>
            <button
              className='ml-2 font-bold bg-transparent border-none outline-none'
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
