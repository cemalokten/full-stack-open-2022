const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET a selection of blogs posts', () => {
  test('where the length equals 3', async () => {
    const res = await api.get('/api/blogs').query({limit: 3});
    expect(res.body.length).toEqual(3)
  }) 

  test('Is ID field defined as `id` instead of `_id`', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})


describe('POST a blog to the database', () => {
  const post = {
    title: 'New post',
    author: 'Cemal',
    url: 'www.example.com',
    likes: 3,
  }

  test('should add 1 to the total number of blogs', async () => {
    const before = await api.get('/api/blogs')
    await api.post('/api/blogs').send(post)
    const after = await api.get('/api/blogs')
    expect(after.body.length).toEqual(before.body.length + 1)
  })

  const postWithoutLikes = {
    title: 'A post',
    author: 'Bobby',
    url: 'www.example.com',
    likes: 0,
  }

  test('without any likes it will default to 0', async () => {
    const res = await api.post('/api/blogs').send(postWithoutLikes)
    expect(res.body.likes).toEqual(0)
  })

  const postWithoutTitleOrUrl = {
    author: 'Jess',
    likes: 21,
  }

  test('without title or url returns 400 bad request', async () => {
    const res = await api.post('/api/blogs').send(postWithoutTitleOrUrl)
    expect(res.statusCode).toBe(400)
  })
})


describe('DELETE a post from the database', () => {
  test('and expect there to be one less post in the database', async () => {
    const before = await api.get('/api/blogs')
    const { id } = before.body[0]
    await api.del(`/api/blogs/delete/${id}`)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(before.body.length - 1)
  })
})


describe('UPDATE a post from the database', () => {
  test('and expect likes to increase by 1 for the most recent entry', async () => {
    const resA = await api.get('/api/blogs')
    const { id, likes } = resA.body[0]
    await api.patch(`/api/blogs/update/${id}`).send({ likes: likes + 1 })
    const resB = await api.get('/api/blogs')
    const { likes: likesAfterUpdate } = resB.body[0]
    expect(likesAfterUpdate).toBe(likes + 1)
  })
})
