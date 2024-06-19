import { PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from '../prop-types/ModalProps'

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside as any)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef])

  return (
    <>
      {isOpen &&
        createPortal(
          <div className='fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-70'>
            <div
              ref={modalRef}
              className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform md:w-5/12'
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Modal
