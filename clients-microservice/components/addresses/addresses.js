const controller = require('./addressesController');

const store = require('../../store/mysql');

module.exports = controller(store);
