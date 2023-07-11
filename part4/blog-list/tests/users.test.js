const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('POST /api/users', () => {
  test('return 400 status and error if username of password are missing', async () => {
    const user = {
      name: 'Example',
      password: 'example',
    };

    const res = await api.post('/api/users').send(user);
    expect(res.body.error).toBeDefined();
    expect(res.status).toBe(400);
  });
  test('return error if username or password are < 3 characters', async () => {
    const user = {
      username: '12',
      password: '12',
    };

    const res = await api.post('/api/users').send(user);
    expect(res.body.error).toBeDefined();
    expect(res.status).toBe(400);
  });
});
