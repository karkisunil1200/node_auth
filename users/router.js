const express = require('express');
const Users = require('../users/users-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({message: 'Error gettin users', error: err.message});
    });
});

module.exports = router;
