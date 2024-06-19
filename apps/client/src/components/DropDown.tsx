import { removeToken } from '@/utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createPortal } from 'react-dom'
import { CgProfile } from 'react-icons/cg'
import { FiEdit } from 'react-icons/fi'
import { HiOutlineLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useDisclosure } from '../hooks/useDisclosure'
import { useMeQuery } from '../hooks/useMeQuery'

interface MenuItemProps {
  children: React.ReactNode
  href: string
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void | undefined
}

export const MenuItem: React.FC<MenuItemProps> = ({
  href,
  children,
  onClick,
}) => (
  <Link
    onClick={onClick}
    className='flex items-center space-x-3 p-3 hover:bg-gray-100'
    to={href}
  >
    {children}
  </Link>
)

const UserDropDown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, toggle } = useDisclosure()
  const queryClient = useQueryClient()
  const { currentUser } = useMeQuery()

  const logout = () => {
    queryClient.resetQueries()
    removeToken()
  }

  return (
    <div
      onBlur={(event) => {
        // currentTarget refers to this component.
        // relatedTarget refers to the element where the user clicked (or focused) which
        // triggered this event.
        // So in effect, this condition checks if the user clicked outside the component.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          // do your thing.
          toggle()
        }
      }}
      className='relative ml-auto flex flex-col items-center justify-between'
    >
      <button onClick={toggle}>{children}</button>
      <>
        {isOpen &&
          createPortal(
            <div
              hidden={!isOpen}
              className='absolute right-0 top-full z-50 w-48 place-items-end rounded-lg bg-white shadow-md'
            >
              <MenuItem onClick={toggle} href={`/u/${currentUser!.username}`}>
                <CgProfile size='1.5em' />
                <span>Profile</span>
              </MenuItem>

              <MenuItem onClick={toggle} href='/edit-profile'>
                <FiEdit size='1.5em' />
                <span>Edit Profile</span>
              </MenuItem>
              <MenuItem onClick={logout} href='/login'>
                <HiOutlineLogout size='1.5em' />
                <span>Logout</span>
              </MenuItem>
            </div>,
            document.body
          )}
      </>
    </div>
  )
}

export default UserDropDown
