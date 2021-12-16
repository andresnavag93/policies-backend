const { TABLES } = require('../../../utils/constants');

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.auth, (table) => {
    table.increments('id').primary();
    table.integer('role_id').unsigned().notNull();
    table
      .foreign('role_id')
      .references('id')
      .inTable(TABLES.attributes)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('id')
      .inTable(TABLES.users)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('email', 150).unique().notNull();
    table.string('password', 64).notNull();
    table.dateTime('last_login');
    table.integer('recovery_code');
    table.dateTime('recovery_code_expires');
    table.string('token');
    table.boolean('is_active').defaultTo(true);
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.auth);
};
