const { TABLES } = require('../../../utils/constants');

exports.seed = function (knex) {
  return knex(TABLES.attributes)
    .del()
    .then(function () {
      return knex(TABLES.attributes).insert([
        { name: 'ROLES' },
        { name: 'GENEROS' },
        { attribute_id: 1, name: 'ADMINISTRADOR' },
        { attribute_id: 1, name: 'AGENTE' },
        { attribute_id: 2, name: 'MASCULINO' },
        { attribute_id: 2, name: 'FEMENINO' },
      ]);
    });
};
