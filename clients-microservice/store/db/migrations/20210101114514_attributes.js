const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.attributes, (table) => {
    table.increments('id').primary();
    table.string('name', 150).notNull();
    table.string('value', 150);
    table.integer('attribute_id').unsigned();
    table
      .foreign('attribute_id')
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
  return knex.schema.dropTable(TABLES.attributes);
};
