import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAddPostMutation } from '../generated/graphql';

const AddPost: React.FC = () => {
  const [file, setFile] = useState<File>(null as any);
  const onDrop = useCallback(
    (files: File[]) => {
      console.log('files dropped');
      console.log(files);
      setFile(files[0]);
    },
    [setFile]
  );
  const [addPost] = useAddPostMutation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('No file selected');
    try {
      // console.log(file);
      const res = await addPost({ variables: { file } });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <p>{file.name}</p>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <button type='submit'>Upload</button>
    </form>
  );
};

export default AddPost;
