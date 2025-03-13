const express = require('express');
const { createEvent, getEventsByUser } = require('../models/Events');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, description, date, category, reminder, userId } = req.body;
  if (!name || !date || !category || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const event = createEvent({ name, description, date, category, reminder, userId });
  res.status(201).json(event);
});

router.get('/', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  const userEvents = getEventsByUser(Number(userId));
  res.json(userEvents);
});

module.exports = router;