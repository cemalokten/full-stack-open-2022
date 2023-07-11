/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user-lists' },
  userId: String,
});

blogSchema.set('toJSON', {
  transform: (_, object) => {
    object.id = object._id.toJSON();
    delete object._id;
    delete object.__v;
  },
});

// Function to get the collection name depending on the NODE_ENV
const getCollectionName = () => {
  const env = process.env.NODE_ENV || 'development'; // Use 'development' as default
  return env === 'test' ? 'blog-list-tests' : 'blog-lists';
};

const Blog = mongoose.model(getCollectionName(), blogSchema);

module.exports = Blog;
