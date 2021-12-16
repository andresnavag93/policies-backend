const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.users, (table) => {
    table.increments('id').primary();
    table.string('name', 150);
    table.string('lastname', 150);
    table.integer('bono')
    table.string('cellphone', 25);
    table.date('birthday');
    table.integer('gender_id').unsigned();
    table
      .foreign('gender_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.users);
};
