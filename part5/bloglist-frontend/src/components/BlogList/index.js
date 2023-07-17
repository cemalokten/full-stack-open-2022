import React, { useState, useEffect } from 'react';
import Blog from '../Blog';
import blogService from '../../services/blogs';

const BlogList = ({ refresh }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, [refresh]);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default BlogList;
