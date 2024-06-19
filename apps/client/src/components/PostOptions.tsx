import { MdMoreHoriz } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/toast'
import { Post } from '../gql/graphql'
import { DeletePostMutationDocument } from '../graphql/mutations'
import { useDisclosure } from '../hooks/useDisclosure'
import Modal from '../shared/Modal'
import { useGqlMutation } from '../utils/react-query-gql'
import ActionModal from './ActionModal'
import EditCaption from './EditCaption'

const PostOptions: React.FC<{ post: Post; isCurrentUserPost: boolean }> = ({
  post,
  isCurrentUserPost,
}) => {
  const { id, caption, imgURL } = post

  const toast = useToast()
  const navigate = useNavigate()

  const { isOpen: isActionModalOpen, toggle: toggleActionModal } =
    useDisclosure(false)

  const { isOpen: isEditCaptionModalOpen, toggle: toggleEditCaptionModal } =
    useDisclosure()

  const { mutate: deletePost } = useGqlMutation(DeletePostMutationDocument, {
    onSuccess(data) {
      if (data.deletePost) {
        toggleActionModal()
        toast('Post removed successfully')
        navigate('/')
      }
    },
  })

  const handleOpenEditCaptionModal = () => {
    toggleActionModal()
    toggleEditCaptionModal()
  }

  const handleDeletePost = () => {
    deletePost({
      postId: id,
    })
  }

  return (
    <div className='cursor-pointer' role='button'>
      <MdMoreHoriz size='1.5em' onClick={toggleActionModal} />
      <ActionModal isOpen={isActionModalOpen} onClose={toggleActionModal}>
        {isCurrentUserPost && (
          <>
            <li role='button' className='red' onClick={handleDeletePost}>
              Delete Post
            </li>
            <li role='button' onClick={handleOpenEditCaptionModal}>
              Edit caption
            </li>
          </>
        )}
        <li onClick={() => navigate(`/p/${id}`)}>Go to Post</li>
      </ActionModal>
      {/* Edit Caption Modal */}
      <Modal isOpen={isEditCaptionModalOpen} onClose={toggleEditCaptionModal}>
        <EditCaption
          postCaption={caption}
          postId={id}
          postImage={imgURL}
          close={toggleEditCaptionModal}
        />
      </Modal>
    </div>
  )
}

export default PostOptions
