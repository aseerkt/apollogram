import React from 'react';
import Card from './Card';

export interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  return isOpen ? <Card className='fixed z-20 p-4'>{children}</Card> : <></>;
};

export default Modal;
