const express = require('express');
const bcryptjs = require('bcryptjs');
const Users = require('../users/users-model');
const {isValid} = require('../users/users-services');

const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
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
  } else {
    res.status(400).json({message: 'please provide username and password'});
  }
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (isValid(req.body)) {
    Users.findBy({username})
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          req.session.loggedIn = true;
          req.session.user = user;

          res.status(200).json({message: `welcome ${username}`});
        } else {
          res.status(401).json({message: 'Invalid credentials'});
        }
      })
      .catch(err => {
        res.status(500).json({message: err.message});
      });
  } else {
    res.status(404).json({
      message: 'please provide username and password and the password shoud be alphanumeric'
    });
  }
});

module.exports = router;
