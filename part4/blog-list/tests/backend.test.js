/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
// const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

let token;
let postID;

describe('GET a selection of blogs posts', () => {
  test('where the length equals 3', async () => {
    const res = await api.get('/api/blogs').query({ limit: 3 });
    expect(res.body.length).toEqual(3);
  });

  test('Is ID field defined as `id` instead of `_id`', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('POST a blog to the database', () => {
  beforeEach(async () => {
    const user = await User.findOne({ username: 'BobbyTest' });

    const tokenContent = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(tokenContent, process.env.JWT_SECRET);
  });

  const post = {
    title: 'New post',
    author: 'Cemal',
    url: 'www.example.com',
    likes: 3,
  };

  test('should add 1 to the total number of blogs', async () => {
    const before = await api.get('/api/blogs');
    await api.post('/api/blogs').send(post).set('authorization', `bearer ${token}`);
    const after = await api.get('/api/blogs');
    expect(after.body.length).toEqual(before.body.length + 1);
  });

  const postWithoutLikes = {
    title: 'A post',
    author: 'Bobby',
    url: 'www.example.com',
  };

  test('without any likes it will default to 0', async () => {
    const res = await api.post('/api/blogs').send(postWithoutLikes).set('authorization', `bearer ${token}`);
    postID = res.body.id;
    expect(res.body.likes).toEqual(0);
  });

  const postWithoutTitleOrUrl = {
    author: 'Jess',
    likes: 21,
  };

  test('without title or url returns 400 bad request', async () => {
    const res = await api.post('/api/blogs').send(postWithoutTitleOrUrl).set('authorization', `bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE a post from the database', () => {
  test('and expect there to be one less post in the database', async () => {
    const before = await api.get('/api/blogs');
    await api.del(`/api/blogs/delete/${postID}`).set('authorization', `bearer ${token}`);
    const res = await api.get('/api/blogs');
    expect(res.body.length).toBe(before.body.length - 1);
  });
});

describe('UPDATE a post from the database', () => {
  test('and expect likes to increase by 1 for the most recent entry', async () => {
    const post = await Blog.findOne({ title: 'New post' });
    await api.patch(`/api/blogs/update/${post._id}`).send({ likes: post.likes + 1 });
    const postAfterUpdate = await Blog.findOne({ title: 'New post' });
    expect(postAfterUpdate.likes).toBe(post.likes + 1);
  });
});
