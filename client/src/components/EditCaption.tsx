import { gql } from '@apollo/client';
import { createRef, useEffect, useState } from 'react';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { useMessageCtx } from '../context/MessageContext';
import { useEditCaptionMutation } from '../generated/graphql';

interface EditCaptionProps {
  postId: string;
  postCaption: string;
  postImage: string;
  close: Function;
}

const EditCaption: React.FC<EditCaptionProps> = ({
  postId,
  postCaption,
  postImage,
  close,
}) => {
  const { setMessage } = useMessageCtx();
  const [caption, setCaption] = useState(postCaption);
  const [editCaption] = useEditCaptionMutation();
  const inputRef = createRef<HTMLInputElement>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await editCaption({
        variables: { postId, caption },
        update: (cache, { data }) => {
          const newCaption = data?.editCaption;
          if (newCaption) {
            cache.writeFragment<{ caption: string }>({
              fragment: gql`
                fragment PostCaption on Post {
                  caption
                }
              `,
              id: 'Post:' + postId,
              data: { caption },
            });
            setMessage('Post caption updated');
          }
          close();
        },
      });
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <Card className={`p-5`}>
      <h1 className='mt-1 mb-3 text-xl font-semibold uppercase'>
        Edit Caption
      </h1>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          <label className='inline-block mb-1 font-bold' htmlFor='caption'>
            Caption
          </label>
          <div>
            <input
              id='caption'
              name='caption'
              placeholder='Add caption for your post...'
              className='w-full px-2 py-1 mb-3 border border-gray-300 rounded-md bg-blue-50 focus:border-gray-500'
              ref={inputRef}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <small className='block leading-4 text-gray-500'>
              Give your post a catchy caption
            </small>
            {/* <small className='my-1 text-red-700'>{error}</small> */}
          </div>
          <div className='mt-2' style={{ height: 'calc(100vh - 400px)' }}>
            <img className='h-full' src={postImage} alt='Upload preview' />
          </div>
        </div>

        <Button
          isLoading={submitting}
          className='block mx-auto'
          color='dark'
          type='submit'
          disabled={!caption || postCaption === caption}
        >
          Update caption
        </Button>
      </form>
    </Card>
  );
};

export default EditCaption;
