const knex = require('knex');

const config = require('../knexfile');

const enviroment = process.env.NODE_ENV || 'production';

module.exports = knex(config[enviroment]);
