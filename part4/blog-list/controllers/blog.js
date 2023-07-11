/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const blog = require('express').Router();
const { Blog } = require('../models');

blog.get('/', async (request, response) => {
  const { limit } = request.query;
  const blogs = await Blog.find({}).limit(limit);
  response.json(blogs.map((blog) => blog.toJSON()));
});

blog.post('/', async (request, response) => {
  const { body } = request;
  if (!body.title || !body.url) response.status(400).end();

  const user = request.user;

  const blog = new Blog({ title: body.title, url: body.url, userId: user._id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blog.delete('/delete/:id', async (request, response) => {
  const id = request.params?.id;

  await Blog.deleteOne({ _id: id });

  response.status(201).end();
});

blog.patch('/update/:id', async (request, response) => {
  // Get id
  const _id = request.params?.id;
  await Blog.updateOne({ _id }, request.body);
  response.status(201).end();
});

module.exports = blog;
