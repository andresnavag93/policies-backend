const controller = require('./clientsController');

const store = require('../../store/mysql');

module.exports = controller(store);
