export default async (fastify) => {
  const { models } = fastify;
  fastify.get('/orders', async (_, reply) => {
    const orders = await models.Orders.query();
    return reply.code(200).send(orders);
  });

  fastify.post('/orders', async (req, reply) => {
    const sessionId = req.session.get('session_id');
    const userId = req.user?.id;

    if (!sessionId && !userId) {
      return reply.code(400).send({ error: 'Session ID is required' });
    }

    const cart = await models.Cart.query().findOne({ session_id: sessionId });

    if (!cart) {
      return reply.code(400).send({ error: 'cart not found' });
    }

    const cartItems = await cart
      .$relatedQuery('items')
      .withGraphFetched('product');

    if (cartItems.length === 0) {
      return reply.code(400).send({ error: 'cartItems not found' });
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    const newOrder = await models.Orders.query().insert({
      user_id: userId || null,
      status: 'new',
      total_price: totalPrice,
    });

    await Promise.all(
      cartItems.map(async (item) => {
        await newOrder.$relatedQuery('items').insert({
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        });
      })
    );

    // Очищаем корзину
    // await cart.$relatedQuery('items').delete();
    return reply
      .status(201)
      .send({ order_id: newOrder.id, status: 'new', total_price: totalPrice });
  });

  fastify.get('/orders/:id', async (req, reply) => {
    const { id } = req.params;

    const order = await models.Orders.query()
      .findById(Number(id))
      .withGraphFetched('items.product');

    if (!order) {
      return reply.status(404).send({ error: 'Order not found' });
    }

    return reply.send(order);
  });

  fastify.patch('/orders/:id/status', async (req, reply) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['new', 'paid', 'shipped', 'completed', 'canceled'];
    if (!allowedStatuses.includes(status)) {
      return reply.status(400).send({ error: 'Invalid status' });
    }

    const updatedOrder = await models.Orders.query().patchAndFetchById(
      Number(id),
      {
        status,
      }
    );

    if (!updatedOrder) {
      return reply.status(404).send({ error: 'Order not found' });
    }

    return reply.code(200).send(updatedOrder);
  });
};
