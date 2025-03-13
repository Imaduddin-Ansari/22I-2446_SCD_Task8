let events = [];

const createEvent = (event) => {
  event.id = events.length + 1;
  events.push(event);
  return event;
};

const getEventsByUser = (userId) => events.filter(event => event.userId === userId);

module.exports = { events, createEvent, getEventsByUser };