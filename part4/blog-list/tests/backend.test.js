const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('GET a selection of blog posts', async () => {
  const res = await api.get('/api/blogs');
  console.log(res)
})