var environment = process.env.NODE_DEV || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
