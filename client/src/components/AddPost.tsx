import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAddPostMutation } from '../generated/graphql';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import Card from '../components-ui/Card';
import { FaCameraRetro } from 'react-icons/fa';

interface AddPostProps {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPost: React.FC<AddPostProps> = ({ className, setIsOpen }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File>(null as any);
  const onDrop = useCallback(
    (files: File[]) => {
      console.log('files dropped');
      console.log(files);
      setFile(files[0]);
    },
    [setFile]
  );
  const [addPost] = useAddPostMutation({
    update: (cache, { data }) => {
      if (data?.addPost.post) {
        cache.evict({ fieldName: 'getPosts' });
      }
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('No file selected');
    try {
      // console.log(file);
      const res = await addPost({ variables: { file, caption } });
      console.log(res);
      if (res.data?.addPost.ok) {
        setFile(null as any);
        setCaption('');
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className={`p-5 ${className}`}>
      <h1 className='mt-1 mb-3 text-xl font-semibold uppercase'>Upload Post</h1>
      <form onSubmit={onSubmit}>
        <InputField
          focusOnRender
          error=''
          type='text'
          value={caption}
          name='caption'
          label='Caption'
          placeholder='Add caption for your post...'
          onChange={(e) => setCaption(e.target.value)}
        />
        <div
          className='p-5 my-2 text-gray-700 border border-blue-400 rounded cursor-pointer hover:bg-gray-100'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className='text-xs text-black'>{file.name}</p>
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

        <Button className='block mx-auto mt-3' color='dark' type='submit'>
          Upload
        </Button>
      </form>
    </Card>
  );
};

export default AddPost;
