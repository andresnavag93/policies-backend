const controller = require('./vehiclesController');

const store = require('../../store/mysql');

module.exports = controller(store);
