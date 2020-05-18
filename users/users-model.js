const db = require('../data/dbConfig');

module.exports = {
  addUsers,
  getUsers
};

function addUsers(credentials) {
  return db
    .select('*')
    .from('users')
    .insert(credentials);
}

function getUsers() {
  return db.select('*').from('users');
}
