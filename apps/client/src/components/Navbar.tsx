import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';
import AddPost from './AddPost';
import DropDown from './DropDown';
import Avatar from '../shared/Avatar';
import Container from '../shared/Container';
import Modal from '../shared/Modal';
import { FiPlusSquare } from 'react-icons/fi';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
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
          <h1 style={{ fontFamily: 'Grand Hotel', fontSize: '2rem' }}>
            Apollogram
          </h1>
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
