import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apolloClient } from '../utils/apolloClient';
import Avatar from '../components-ui/Avatar';
import Container from '../components-ui/Container';
import DropDown from './DropDown';
import { MeDocument } from '../generated/graphql';
import { MdHome } from 'react-icons/md';
import { FiPlusSquare } from 'react-icons/fi';
import Modal from '../components-ui/Modal';
import AddPost from './AddPost';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { me } = apolloClient.readQuery({ query: MeDocument });
  return (
    <nav className='fixed inset-x-0 top-0 z-10 bg-white border border-gray-200 h-14'>
      <Container className='flex items-center h-full px-2 md:px-0'>
        <Link to='/'>
          <img
            className='object-contain w-auto h-8'
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
            alt='instgram logo'
          />
        </Link>
        {me && (
          <>
            <div className='flex items-center ml-auto'>
              <Link to='/posts'>
                <MdHome size='1.8em' className='mr-2' title='Home' />
              </Link>
              <button className='mr-2' onClick={() => setOpen(true)}>
                <FiPlusSquare size='1.8em' />
              </button>
              <DropDown>
                <Avatar
                  className='w-5 h-5 my-2 ml-auto cursor-pointer'
                  title={me.username}
                  src={me.profile.imgURL}
                />
              </DropDown>
            </div>
            {/* Add Post Modal */}
            <Modal isOpen={open} setIsOpen={setOpen}>
              <AddPost setIsOpen={setOpen} className='' />
            </Modal>
          </>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
