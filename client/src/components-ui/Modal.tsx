import { useEffect, useRef } from 'react';
import { ModalProps } from '../prop-types/ModalProps';

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef]);

  return isOpen ? (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-70'>
      <div
        ref={modalRef}
        className='absolute w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-5/12'
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
