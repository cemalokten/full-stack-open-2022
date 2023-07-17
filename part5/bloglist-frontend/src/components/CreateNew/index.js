import React, { useState } from 'react';
import blogs from '../../services/blogs';

const CreateNew = ({ setRefresh, refresh }) => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogs.addPost({ title, author, url });
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>title:</span>
        <input type="text" placeholder="title" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <span>author:</span>
        <input type="text" placeholder="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <span>url:</span>
        <input type="text" placeholder="url" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateNew;
