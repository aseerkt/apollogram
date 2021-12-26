import { useState } from 'react';
import Spinner from '../shared/Spinner';
import { useMessageCtx } from '../context/MessageContext';
import {
  RegularCommentFragment,
  RegularCommentFragmentDoc,
  useAddCommentMutation,
} from '../generated/graphql';

interface AddCommentProps {
  postId: string;
  customRef: React.RefObject<HTMLInputElement>;
  className?: string;
}

const AddComment: React.FC<AddCommentProps> = ({
  postId,
  customRef,
  className,
}) => {
  const { setMessage } = useMessageCtx();
  const [text, setText] = useState('');

  const [addComment, { loading: submitting }] = useAddCommentMutation({
    variables: { postId, text },
    update: (cache, { data }) => {
      const newComment = data?.addComment;
      if (newComment) {
        cache.modify({
          id: 'Post:' + postId,
          broadcast: false,
          fields: {
            comments(existingCommentRefs = [], { readField }) {
              const newCommentRef = cache.writeFragment<RegularCommentFragment>(
                {
                  fragmentName: 'RegularComment',
                  data: newComment,
                  fragment: RegularCommentFragmentDoc,
                  broadcast: false,
                }
              );

              // Quick safety check - if the new comment is already
              // present in the cache, we don't need to add it again.
              if (
                existingCommentRefs.some(
                  (ref: any) => readField('id', ref) === newComment.id
                )
              ) {
                return existingCommentRefs;
              }

              return [newCommentRef, ...existingCommentRefs];
            },
          },
        });
        setText('');
        setMessage('Comment Added');
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!text) throw new Error('Comment Text is Empty');
      await addComment();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div
      className={`px-3 relative py-3 border-t-2 justify-items-end ${className}`}
    >
      {submitting && (
        <div className='absolute top-0 left-0 flex items-center w-full h-full bg-white bg-opacity-80'>
          <Spinner size='small' />
        </div>
      )}
      <form className='flex items-center w-full' onSubmit={onSubmit}>
        <input
          ref={customRef}
          type='text'
          placeholder='Add Comment...'
          className='flex-1 border-none outline-none'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='pl-2 font-bold text-blue-800 disabled:opacity-20 disabled:cursor-default'
          disabled={!text}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
