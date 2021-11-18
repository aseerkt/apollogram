import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';
import AddPost from './AddPost';
import DropDown from './DropDown';
import Avatar from '../components-ui/Avatar';
import Container from '../components-ui/Container';
import Modal from '../components-ui/Modal';
import { FiPlusSquare } from 'react-icons/fi';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoIosCompass } from 'react-icons/io';
import { ImCompass2 } from 'react-icons/im';
import { MdExplore, MdOutlineExplore } from 'react-icons/md';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data } = useMeQuery();
  const me = data?.me;

  return (
    <nav className='fixed inset-x-0 top-0 z-50 bg-white border border-gray-200 h-14'>
      <Container className='flex items-center h-full px-2 md:px-0'>
        <Link aria-label='app icon' to='/'>
          <img
            className='object-contain w-auto h-8'
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
            alt='instgram logo'
          />
        </Link>
        {me && (
          <>
            <div className='flex items-center ml-auto space-x-3'>
              <Link title='Home' aria-label='home' to='/'>
                {location.pathname === '/' ? (
                  <AiFillHome size='1.7em' />
                ) : (
                  <AiOutlineHome size='1.7em' />
                )}
              </Link>
              <Link title='Explore' aria-label='explore' to='/explore'>
                {location.pathname === '/explore' ? (
                  <MdExplore size='2em' />
                ) : (
                  <MdOutlineExplore size='2em' />
                )}
              </Link>
              <button
                title='Add Post'
                aria-label='add post button'
                className='mr-4'
                onClick={() => setOpen(true)}
              >
                <FiPlusSquare aria-label='add post icon' size='1.8em' />
              </button>
              <DropDown>
                <Avatar
                  className='w-5 h-5 my-2 ml-auto cursor-pointer'
                  title={me.username}
                  src={me.imgURL}
                />
              </DropDown>
            </div>
            {/* Add Post Modal */}
            <Modal isOpen={open} setIsOpen={setOpen}>
              <AddPost setIsOpen={setOpen} />
            </Modal>
          </>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
