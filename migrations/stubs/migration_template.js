const tableName = '';

export const up = async (knex) => {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.integer('status_id').references('id').inTable('statuses');
    table.string('password_hash').notNullable();
    table.enu('role', ['customer', 'admin', 'manager']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table
      .integer('catalog_id')
      .unsigned()
      .references('id')
      .inTable('Catalogs')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('Users')
      .onDelete('SET NULL');
  });
};

export const down = (knex) => knex.schema.dropTable(tableName);
