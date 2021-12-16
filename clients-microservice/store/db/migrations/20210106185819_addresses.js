const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.addresses, (table) => {
    table.increments('id').primary();
    table.integer('client_id').unsigned().notNull();
    table
      .foreign('client_id')
      .references('id')
      .inTable(TABLES.clients)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('state_id').unsigned().notNull();
    table
      .foreign('state_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('line_1');
    table.string('line_2');
    table.string('city', 100).notNull();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.addresses);
};
