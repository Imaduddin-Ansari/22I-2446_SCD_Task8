const cron = require('node-cron');
const { events } = require('../models/Events');

cron.schedule('* * * * *', () => {
  const upcomingEvents = events.filter(event => event.reminder && new Date(event.date) <= new Date(Date.now() + 15 * 60000));
  upcomingEvents.forEach(event => {
    console.log(`Reminder: ${event.name}`);
    console.log(`Description: ${event.description}`);
    console.log(`Date: ${event.date}`);
    console.log('---'); // Separator for readability
  });
});