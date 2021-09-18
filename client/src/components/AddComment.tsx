import { useState } from 'react';
import Spinner from '../components-ui/Spinner';
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
  const [submitting, setSubmitting] = useState(false);

  const [addComment] = useAddCommentMutation({
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
                  data: newComment,
                  fragment: RegularCommentFragmentDoc,
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
        setMessage('Comment Added');
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (!text) throw new Error('Comment Text is Empty');
      const res = await addComment();
      if (res) {
        setSubmitting(false);
      }
      if (res.data?.addComment) setText('');
      console.log(res);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
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
