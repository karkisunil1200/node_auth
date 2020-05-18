const express = require('express');
const authRouter = require('../auth/router');
const userRouter = require('../users/router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send({server: 'up'});
});

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;
