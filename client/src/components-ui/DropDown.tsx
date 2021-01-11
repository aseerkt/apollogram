import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apolloClient } from '..';
import { MeDocument } from '../generated/graphql';

interface MenuItemProps {
  href: string;
  label?: string;
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void | undefined;
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, label, onClick }) => (
  <Link
    onClick={onClick}
    className='block px-3 py-1 hover:bg-gray-100'
    to={href}
  >
    {label}
  </Link>
);

const DropDown: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  const { me } = apolloClient.readQuery({ query: MeDocument });

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
        className='absolute right-0 w-48 mt-8 bg-white rounded-lg shadow-md place-items-end'
      >
        <MenuItem onClick={toggle} href={`/${me.username}`} label='Profile' />

        <MenuItem
          onClick={toggle}
          href='/update-profile'
          label='Update Profile'
        />
      </div>
    </div>
  );
};

export default DropDown;
