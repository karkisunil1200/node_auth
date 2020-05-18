const express = require('express');
const Users = require('../users/users-model');

const router = express.Router();

function restricted(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({json: 'You cannot pass'});
  }
}

router.get('/', restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({message: 'Error gettin users', error: err.message});
    });
});

module.exports = router;
