const express = require('express');
const bcryptjs = require('bcryptjs');
const Users = require('../users/users-model');

const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;

  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.addUsers(credentials)
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({message: 'Cannot log in', error: err.message});
    });
});

module.exports = router;
