import React, { useState } from 'react';
import { useAddPostMutation } from '../generated/graphql';

const AddPost: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState('' as any);

  const fileChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = files ? files[0] : null;
    // console.log(uploadFile);
    if (uploadFile) setFile(uploadFile);
  };
  const [addPost] = useAddPostMutation({ variables: { caption, image: file } });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('No file selected');
    try {
      // console.log(file);
      const { data } = await addPost();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={caption}
          placeholder='caption'
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type='file' onChange={fileChange} />
        <button type='submit'>AddPost</button>
      </form>
    </div>
  );
};

export default AddPost;
