const bcrypt = require('bcryptjs');

let users = [];

const findUserByUsername = (username) => users.find(user => user.username === username);

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  return user;
};

module.exports = { users, findUserByUsername, createUser };