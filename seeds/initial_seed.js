export const seed = async (knex) => {
  // Сначала удаляем данные в обратном порядке, чтобы не было конфликтов внешних ключей
  await knex('order_addresses').del();
  await knex('payments').del();
  await knex('order_items').del();
  await knex('orders').del();
  await knex('cart_items').del();
  await knex('cart').del();
  await knex('products').del();
  await knex('catalogs').del();
  await knex('users').del();

  // Добавляем пользователя
  const [userId] = await knex('users')
    .insert({
      email: 'john.doe@example.com',
      phone: '555-555-5555',
      password_hash: 'hashed_password',
      role: 'customer',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем каталог
  const [catalogId] = await knex('catalogs')
    .insert({
      name: 'Electronics',
      description: 'Electronic gadgets and devices.',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем продукт, связанный с каталогом
  const [productId] = await knex('products')
    .insert({
      catalog_id: catalogId.id,
      name: 'Smartphone',
      description: 'A fancy smartphone',
      price: 299.99,
      stock: 50,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем корзину, связанную с пользователем
  const [cartId] = await knex('cart')
    .insert({
      user_id: userId.id,
      session_id: 'session_123',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем товары в корзину
  await knex('cart_items').insert({
    cart_id: cartId.id,
    product_id: productId.id,
    quantity: 2,
  });

  // Добавляем заказ, связанный с пользователем
  const [orderId] = await knex('orders')
    .insert({
      user_id: userId.id,
      status: 'new',
      total_price: 599.98, // 2 * 299.99
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем товары заказа
  await knex('order_items').insert({
    order_id: orderId.id,
    product_id: productId.id,
    quantity: 2,
    price: 299.99,
  });

  // Добавляем платеж, связанный с заказом
  await knex('payments')
    .insert({
      order_id: orderId.id,
      payment_status: 'waiting',
      payment_method: 'credit_card',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Добавляем адрес заказа
  await knex('order_addresses').insert({
    order_id: orderId.id,
    address_line: '123 Main St',
    city: 'New York',
    postal_code: '10001',
    country: 'USA',
  });
};
