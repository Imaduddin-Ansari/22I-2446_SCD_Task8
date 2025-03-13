const request = require('supertest');
const app = require('../src/app');
const { events } = require('../src/models/Events');

describe('Event Routes', () => {
  beforeEach(() => {
    events.length = 0;
  });

  it('should create a new event', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        name: 'Test Event',
        description: 'This is a test event',
        date: '2023-12-31T10:00:00Z',
        category: 'Meeting',
        reminder: true,
        userId: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Event');
    expect(res.body).toHaveProperty('userId', 1);
  });

  it('should get events for a specific user', async () => {
    await request(app)
      .post('/api/events')
      .send({
        name: 'Test Event 1',
        date: '2023-12-31T10:00:00Z',
        category: 'Meeting',
        userId: 1,
      });

    await request(app)
      .post('/api/events')
      .send({
        name: 'Test Event 2',
        date: '2023-12-31T11:00:00Z',
        category: 'Birthday',
        userId: 2,
      });

    const res = await request(app)
      .get('/api/events')
      .query({ userId: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toHaveProperty('name', 'Test Event 1');
  });

  it('should return an error if userId is missing when getting events', async () => {
    const res = await request(app)
      .get('/api/events');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'userId is required');
  });
});