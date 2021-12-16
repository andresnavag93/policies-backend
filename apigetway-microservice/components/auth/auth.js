const controller = require('./authController');

const store = require('../../store/mysql');

module.exports = controller(store);
