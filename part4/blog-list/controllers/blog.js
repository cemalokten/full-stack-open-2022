const blog = require('express').Router()
const Blog = require('../models/blog')

blog.get('/blogs', async (request, response) => {
  const { limit } = request.query
  const blogs = await Blog.find({}).limit(limit)
  response.json(blogs.map(blog => blog.toJSON()))
})

blog.post('/blogs', async (request, response) => {
  if (!request.body.title || !request.body.url) response.status(400).end()
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blog.delete('/blogs/delete/:id', async (request, response) => {
  const _id = request.params?.id
  await Blog.deleteOne({_id})
  response.status(201).end()
})

blog.patch('/blogs/update/:id', async (request, response) => {
  // Get id
  const _id = request.params?.id
  await Blog.updateOne({_id}, request.body)
  response.status(201).end()
})


module.exports = blog;