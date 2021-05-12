import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { CgProfile } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';

interface MenuItemProps {
  href: string;
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void | undefined;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  href,
  children,
  onClick,
}) => (
  <Link
    onClick={onClick}
    className='flex items-center p-3 hover:bg-gray-100'
    to={href}
  >
    {children}
  </Link>
);

const DropDown: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });

  const me = data!.me!;

  const [logout] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout) {
        window.location.pathname = '/login';
      }
    },
  });

  return (
    <div
      onBlur={(event) => {
        // currentTarget refers to this component.
        // relatedTarget refers to the element where the user clicked (or focused) which
        // triggered this event.
        // So in effect, this condition checks if the user clicked outside the component.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          // do your thing.
          setOpen(false);
        }
      }}
      className='relative flex flex-col items-center justify-between ml-auto'
    >
      <button onClick={toggle}>{children}</button>
      <div
        hidden={!open}
        className='absolute right-0 z-50 w-48 bg-white rounded-lg shadow-md top-full place-items-end'
      >
        <MenuItem onClick={toggle} href={`/u/${me.username}`}>
          <CgProfile size='1.5em' className='mr-3' />
          Profile
        </MenuItem>

        <MenuItem onClick={toggle} href='/edit-profile'>
          <FiEdit size='1.5em' className='mr-3' />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={() => logout() as any} href='/login'>
          <HiOutlineLogout size='1.5em' className='mr-3' />
          Logout
        </MenuItem>
      </div>
    </div>
  );
};

export default DropDown;
