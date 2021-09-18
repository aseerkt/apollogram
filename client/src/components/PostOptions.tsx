import { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Modal from '../components-ui/Modal';
import { useMessageCtx } from '../context/MessageContext';
import { useMeQuery, useDeletePostMutation, Post } from '../generated/graphql';
import ActionModal from './ActionModal';
import EditCaption from './EditCaption';

const PostOptions: React.FC<{ post: Post }> = ({ post }) => {
  const { id, caption, imgURL, user } = post;
  const { setMessage } = useMessageCtx();
  const [isOpen, setIsOpen] = useState(false);
  const [openEditCaption, setOpenEditCaption] = useState(false);

  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  const history = useHistory();

  return (
    <div className='cursor-pointer' role='button'>
      <MdMoreHoriz size='1.5em' onClick={(e) => setIsOpen(true)} />
      <ActionModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {meData && meData.me && meData.me.username === user.username && (
          <>
            <li
              className='red'
              onClick={async () => {
                await deletePost({
                  variables: { postId: id },
                  update: (cache, { data }) => {
                    if (data?.deletePost) {
                      cache.evict({ id: 'Post:' + id });
                      setIsOpen(false);
                      setMessage('Post removed successfully');
                      history.push('/');
                    }
                  },
                });
              }}
            >
              Delete Post
            </li>
            <li
              onClick={() => {
                setOpenEditCaption(true);
                setIsOpen(false);
              }}
            >
              Edit caption
            </li>
          </>
        )}
        <li onClick={() => history.push(`/p/${id}`)}>Go to Post</li>
      </ActionModal>
      {/* Edit Caption Modal */}
      <Modal isOpen={openEditCaption} setIsOpen={setOpenEditCaption}>
        <EditCaption
          postCaption={caption}
          postId={id}
          postImage={imgURL}
          close={() => {
            setOpenEditCaption(false);
            setIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default PostOptions;
