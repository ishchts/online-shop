export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('phone');
    table.string('password_hash').notNullable();
    table.enu('role', ['customer', 'admin', 'manager']).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('catalogs', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table
      .integer('catalog_id')
      .unsigned()
      .references('id')
      .inTable('catalogs')
      .onDelete('CASCADE');
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock').unsigned().notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('cart', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.string('session_id');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('cart_items', (table) => {
    table.increments('id').primary();
    table
      .integer('cart_id')
      .unsigned()
      .references('id')
      .inTable('cart')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable();
  });

  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .enu('status', ['new', 'paid', 'shipped', 'completed', 'canceled'])
      .notNullable()
      .defaultTo('new');
    table.decimal('total_price', 10, 2).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table
      .integer('order_id')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable();
    table.decimal('price', 10, 2).notNullable();
  });

  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table
      .integer('order_id')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .enu('payment_status', ['waiting', 'paid', 'failed'])
      .notNullable()
      .defaultTo('waiting');
    table.string('payment_method');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('order_addresses', (table) => {
    table.increments('id').primary();
    table
      .integer('order_id')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table.string('address_line').notNullable();
    table.string('city').notNullable();
    table.string('postal_code').notNullable();
    table.string('country').notNullable();
  });
};

export const down = async (knex) => {
  // Удаление всех таблиц в обратном порядке их создания
  await knex.schema.dropTableIfExists('order_addresses');
  await knex.schema.dropTableIfExists('payments');
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('cart_items');
  await knex.schema.dropTableIfExists('cart');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('catalogs');
  await knex.schema.dropTableIfExists('users');
};
