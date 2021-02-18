import { useState } from 'react';
import Spinner from '../components-ui/Spinner';
import {
  useAddCommentMutation,
  GetSinglePostDocument,
  GetUserDocument,
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
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [addComment] = useAddCommentMutation({
    variables: { postId, text },
    refetchQueries: [{ query: GetSinglePostDocument, variables: { postId } }],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
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
      <div
        hidden={!submitting}
        className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'
      >
        <Spinner size='small' />
      </div>
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
          className='pl-2 font-bold text-blue-800 disabled:opacity-40'
          disabled={!text}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
