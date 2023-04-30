const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('blog-list', blogSchema)

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    mongoose.set("strictQuery", false);
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

connectDB()

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})