import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GetPostsDocument, useAddPostMutation } from '../generated/graphql';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import Card from '../components-ui/Card';

const AddPost: React.FC = () => {
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
    refetchQueries: [{ query: GetPostsDocument }],
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
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className='p-3'>
      <h1 className='my-1 text-xl font-semibold uppercase'>Upload Post</h1>
      <form onSubmit={onSubmit}>
        <InputField
          error=''
          type='text'
          value={caption}
          placeholder='Caption'
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
            <p className='text-sm text-center uppercase'>
              browse or drop file here
            </p>
          )}
        </div>

        <Button fullWidth type='submit'>
          Upload
        </Button>
      </form>
    </Card>
  );
};

export default AddPost;
