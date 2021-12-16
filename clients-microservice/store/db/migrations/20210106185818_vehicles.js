const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.vehicles, (table) => {
    table.increments('id').primary();
    table.integer('client_id').unsigned().notNull();
    table
      .foreign('client_id')
      .references('id')
      .inTable(TABLES.clients)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('policy_id', 100);
    table.string('brand', 150).notNull();
    table.string('model', 150).notNull();
    table.integer('year');
    table.string('civi', 100);
    table.string('version');
    table.string('plate', 32).notNull();
    table.string('serial', 50).notNull();
    table.integer('doors_no');
    table.integer('pasajeros');
    table.string('type');
    table.string('rate_width_coverage');
    table.string('rate_total_lost');
    table.string('sum_assured');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.vehicles);
};
