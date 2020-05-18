const db = require('../data/dbConfig');

module.exports = {
  getUsers,
  addUsers
};

function getUsers() {
  return db.select('*').from('users');
}

function addUsers(credentials) {
  return db
    .select('*')
    .from('users')
    .insert(credentials);
}
