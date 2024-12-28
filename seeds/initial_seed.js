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

  const products = [
    {
      catalog_id: catalogId.id,
      name: 'Smartphone X1',
      description: 'Flagship smartphone with great features',
      price: 799.99,
      stock: 120,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Laptop Pro 15',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      stock: 50,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Smartwatch A10',
      description: 'Smartwatch with health tracking features',
      price: 199.99,
      stock: 300,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Wireless Earbuds',
      description: 'Noise-cancelling wireless earbuds',
      price: 89.99,
      stock: 200,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: '4K Ultra HD TV',
      description: 'A 55-inch TV with amazing picture quality',
      price: 599.99,
      stock: 30,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Gaming Chair',
      description: 'Ergonomic chair designed for gamers',
      price: 159.99,
      stock: 80,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with great sound',
      price: 49.99,
      stock: 150,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Digital Camera Z50',
      description: 'Compact digital camera with high-quality imaging',
      price: 499.99,
      stock: 60,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Smart Home Hub',
      description: 'Central hub to control your smart home devices',
      price: 89.99,
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      catalog_id: catalogId.id,
      name: 'Portable Power Bank',
      description: 'Keep your devices charged on the go',
      price: 29.99,
      stock: 500,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  // Добавляем продукт, связанный с каталогом
  const [productId] = await knex('products').insert(products).returning('id');

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
