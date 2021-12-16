const { TABLES } = require('../../../utils/constants');

exports.seed = function (knex) {
  return knex(TABLES.attributes)
    .del()
    .then(function () {
      return knex(TABLES.attributes).insert([
        { name: 'GENEROS' },
        { name: 'TIPOS DE DOCUMENTO'},
        { name: 'ESTADO CIVIL'},
        { name: 'ESTADOS'},
        { attribute_id: 1, name: 'Masculino' },
        { attribute_id: 1, name: 'Femenino' },
        { attribute_id: 2, name: 'V' },
        { attribute_id: 2, name: 'E' },
        { attribute_id: 3, name: 'Casado' },
        { attribute_id: 3, name: 'Soltero' },
        { attribute_id: 3, name: 'Viudo' },
        { attribute_id: 3, name: 'Divorciado' },
        { attribute_id: 4 , name: 'Amazonas' },
        { attribute_id: 4 , name: 'Anzoátegui' },
        { attribute_id: 4 , name: 'Apure' },
        { attribute_id: 4 , name: 'Aragua' },
        { attribute_id: 4 , name: 'Barinas' },
        { attribute_id: 4 , name: 'Bolívar' },
        { attribute_id: 4 , name: 'Carabobo' },
        { attribute_id: 4 , name: 'Cojedes' },
        { attribute_id: 4 , name: 'Delta Amacuro' },
        { attribute_id: 4 , name: 'Distrito Capital' },
        { attribute_id: 4 , name: 'Falcón' },
        { attribute_id: 4 , name: 'Guárico' },
        { attribute_id: 4 , name: 'Lara' },
        { attribute_id: 4 , name: 'Mérida' },
        { attribute_id: 4 , name: 'Miranda' },
        { attribute_id: 4 , name: 'Monagas' },
        { attribute_id: 4 , name: 'Nueva Esparta' },
        { attribute_id: 4 , name: 'Portuguesa' },
        { attribute_id: 4 , name: 'Sucre' },
        { attribute_id: 4 , name: 'Táchira' },
        { attribute_id: 4 , name: 'Trujillo' },
        { attribute_id: 4 , name: 'Vargas' },
        { attribute_id: 4 , name: 'Yaracuy' },
        { attribute_id: 4 , name: 'Zulia' },
        { attribute_id: 2, name: 'J' },
        { attribute_id: 2, name: 'G' },
        { attribute_id: 2, name: 'P' },

      ]);
    });
};
