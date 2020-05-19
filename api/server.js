const express = require('express');
const authRouter = require('../auth/router');
const userRouter = require('../users/router');
const session = require('express-session');

const server = express();

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.SECURE_COOKIE || false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
  name: 'monster',
  secret: process.env.COOKIE_SECRET || 'keepitsecret,keepitsafe!'
};

server.use(express.json());

server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.send({server: 'up'});
});

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;
