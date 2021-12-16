const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.clients, (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNull();
    table.string('lastname', 50).notNull();
    table.string('email', 100).unique().notNull();
    table.date('birthday').notNull();
    table.integer('document').notNull();
    table.string('cellphone', 25).notNull();
    table.string('razon_social');
    table.string('occupation').notNull();
    table.integer('gender_id').unsigned();
    table
      .foreign('gender_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('document_type_id').unsigned();
    table
      .foreign('document_type_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('civil_status_id').unsigned();
    table
      .foreign('civil_status_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('agent_id');
    table.boolean('is_active').defaultTo(true);
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.clients);
};
