const { TABLES } = require('../../../utils/constants');

exports.seed = function (knex) {
  return knex(TABLES.auth)
    .del()
    .then(function () {
      return knex(TABLES.auth).insert([
        {
          role_id: 3,
          email: 'tesis@gmail.com',
          password: '$2b$05$iI/ys.gkI7zfsw3zValZ.uJuS0gjwHj1ga0pMmpzZbcO1kY3toUSC',
        }
      ]);
    });
};
