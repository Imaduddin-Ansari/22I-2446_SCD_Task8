const request = require('supertest');
const app = require('../src/app');
const { users } = require('../src/models/User');

describe('User Routes', () => {
  beforeEach(() => {
    users.length = 0;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  it('should not register a user with an existing username', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username already exists');
  });

  it('should login a user with valid credentials', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with invalid credentials', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'wrongpassword' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});