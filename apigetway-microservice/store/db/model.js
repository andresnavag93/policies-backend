const { Model } = require('objection');
const knexConnection = require('./index');

Model.knex(knexConnection);

module.exports = Model;
