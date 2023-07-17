/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const blog = require('express').Router();
const { mongoose } = require('mongoose');
const { Blog } = require('../models');
const { decryptToken, userExtractor } = require('../utils/middleware');

blog.get('/', async (request, response) => {
  const { limit } = request.query;
  const blogs = await Blog.find({}).limit(limit);
  response.json(blogs.map((blog) => blog.toJSON()));
});

blog.post('/', decryptToken, userExtractor, async (request, response) => {
  const { body } = request;

  const user = request.user;

  const blog = new Blog({
    title: body.title, url: body.url, author: body.author, userId: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      response.status(400).json('Required fields are missing');
    } else {
      response.status(500).json({ error: 'An internal error occurred' });
    }
  }
});

blog.delete('/delete/:id', decryptToken, userExtractor, async (request, response) => {
  const id = request.params?.id;
  await Blog.deleteOne({ _id: id });
  response.status(201).end();
});

blog.patch('/update/:id', async (request, response) => {
  const _id = request.params?.id;
  await Blog.updateOne({ _id }, request.body);
  response.status(201).end();
});

module.exports = blog;
