const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (_, object) => {
    object.id = object._id.toJSON()
  }
})

// Function to get the collection name depending on the NODE_ENV
const getCollectionName = () => {
  const env = process.env.NODE_ENV || 'development' // Use 'development' as default
  return env === 'test' ? 'blog-list-test' : 'blog-list'
}

const Blog = mongoose.model(getCollectionName(), blogSchema)

module.exports = Blog