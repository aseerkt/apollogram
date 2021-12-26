import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAddPostMutation } from '../generated/graphql';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { FaCameraRetro } from 'react-icons/fa';
import { useMessageCtx } from '../context/MessageContext';
import { useHistory } from 'react-router-dom';
import useCompressor from '../hooks/useCompressor';

interface AddPostProps {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPost: React.FC<AddPostProps> = ({ className, setIsOpen }) => {
  const { setMessage } = useMessageCtx();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File>(null as any);
  const inputRef = React.createRef<HTMLInputElement>();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const compress = useCompressor();

  const onDrop = useCallback(
    (files: File[]) => {
      // console.log('files dropped');
      // console.log(files);
      if (!files[0].type.includes('image')) {
        setUploadError('Unsupported file format (Supported : JPEG/JPG/PNG)');
        setFile(files[0]);
        return;
      }
      setFile(files[0]);
      setImgSrc(URL.createObjectURL(files[0]));
    },
    [setFile]
  );
  const [addPost] = useAddPostMutation({
    update: (cache, { data }) => {
      if (data?.addPost.post) {
        cache.evict({ fieldName: 'getExplorePosts' });
        cache.evict({
          fieldName: 'getUser',
          args: { username: data.addPost.post.user.username },
        });
        history.push(`/p/${data.addPost.post.id}`);
      }
    },
  });

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('No file selected');
    setSubmitting(true);
    // console.log(file);
    compress(file, {
      width: 600,
      mimeType: 'image/jpeg',
      success: async (result) => {
        const res = await addPost({ variables: { file: result, caption } });
        // console.log(res);
        if (res.data?.addPost.ok) {
          setFile(null as any);
          setImgSrc(null);
          setCaption('');
          setMessage('Post uploaded successfully');
          setIsOpen(false);
        }

        setSubmitting(false);
      },
      error: (err) => {
        alert(err.message);
        setSubmitting(false);
      },
    });
  };

  return (
    <Card className={`p-5 ${className}`}>
      <h1 className='mt-1 mb-3 text-xl font-semibold uppercase'>Upload Post</h1>
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
          {imgSrc && (
            <div className='mt-2' style={{ height: 'calc(100vh - 400px)' }}>
              <img className='h-full' src={imgSrc} alt='Upload preview' />
            </div>
          )}
        </div>
        <div
          className='p-5 my-2 mb-5 text-gray-700 border border-blue-400 rounded cursor-pointer hover:bg-gray-100'
          {...getRootProps()}
        >
          <input
            type='file'
            {...getInputProps()}
            accept='image/*'
            multiple={false}
          />
          {file ? (
            <>
              <p className='text-xs text-black'>{file.name}</p>
              <small className='my-1 text-red-700'>{uploadError}</small>
            </>
          ) : isDragActive ? (
            <p className='text-sm text-center uppercase'>
              Drop the files here ...
            </p>
          ) : (
            <p className='flex items-center justify-center text-sm uppercase'>
              <FaCameraRetro className='mr-3 text-gray-500' size='2em' />
              click to browse or drop file here
            </p>
          )}
        </div>

        <Button
          isLoading={submitting}
          className='block mx-auto'
          color='dark'
          type='submit'
          disabled={!imgSrc || !caption}
        >
          Upload
        </Button>
      </form>
    </Card>
  );
};

export default AddPost;
