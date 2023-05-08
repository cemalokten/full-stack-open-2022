// eslint-disable-next-line arrow-body-style, no-unused-vars
const _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (sum, post) => sum + post.likes;
  const res = blogs.reduce(reducer, 0);
  return res;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  const sort = (a, b) => {
    if (a.likes < b.likes) return 1;
    if (a.likes > b.likes) return -1;
    return 0;
  };
  const res = blogs.sort(sort);
  return res[0]?.likes;
};

const mostBlogs = (blogs) => {
  const res = _.groupBy(blogs, 'author');
  const res2 = _.mapValues(res, (blog) => blog.length);
  const res3 = Object.keys(res2).sort((a, b) => {
    if (res2[a] < res2[b]) return 1;
    if (res2[a] > res2[b]) return 0;
    return 0;
  });
  const name = res3[0];
  const obj = {
    author: name,
    blogs: res2[name],
  };
  return obj;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
