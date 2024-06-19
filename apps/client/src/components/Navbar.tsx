import React from 'react'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { FiPlusSquare } from 'react-icons/fi'
import { MdExplore, MdOutlineExplore } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useDisclosure } from '../hooks/useDisclosure'
import { useMeQuery } from '../hooks/useMeQuery'
import Avatar from '../shared/Avatar'
import Container from '../shared/Container'
import Modal from '../shared/Modal'
import AddPost from './AddPost'
import UserDropDown from './DropDown'

const Navbar: React.FC = () => {
  const { isOpen, toggle } = useDisclosure()
  const location = useLocation()
  const { currentUser } = useMeQuery()

  return (
    <nav className='fixed inset-x-0 top-0 z-50 h-14 border border-gray-200 bg-white'>
      <Container className='flex h-full items-center px-2 md:px-0'>
        <Link aria-label='app icon' to='/'>
          <h1 style={{ fontFamily: 'Grand Hotel', fontSize: '2rem' }}>
            Apollogram
          </h1>
        </Link>
        {currentUser && (
          <>
            <div className='ml-auto flex items-center space-x-3'>
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
                onClick={toggle}
              >
                <FiPlusSquare aria-label='add post icon' size='1.8em' />
              </button>
              <UserDropDown>
                <Avatar
                  className='my-2 ml-auto h-5 w-5 cursor-pointer'
                  title={currentUser!.username}
                  src={currentUser!.imgURL}
                />
              </UserDropDown>
            </div>
            {/* Add Post Modal */}
            <Modal isOpen={isOpen} onClose={toggle}>
              <AddPost onClose={toggle} />
            </Modal>
          </>
        )}
      </Container>
    </nav>
  )
}

export default Navbar
