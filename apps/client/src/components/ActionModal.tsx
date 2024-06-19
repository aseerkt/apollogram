import { PropsWithChildren } from 'react'
import { ModalProps } from '../prop-types/ModalProps'
import Card from '../shared/Card'
import Modal from '../shared/Modal'
import './ActionModal.css'

const ActionModal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose: setIsOpen,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setIsOpen}>
      <Card className='rounded-lg'>
        <ul className='action-modal-list'>
          {children}
          <li
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </li>
        </ul>
      </Card>
    </Modal>
  )
}

export default ActionModal
