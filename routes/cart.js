export default async (fastify) => {
  const { models } = fastify;
  fastify.get('/cart', async (request, reply) => {
    const sessionId = request.session.get('session_id');

    if (!sessionId) {
      return reply.code(400).send({ error: 'Session ID is required' });
    }

    const cart = await models.Cart.query()
      .findOne({ session_id: sessionId })
      .withGraphFetched('items.product');

    if (!cart) {
      return reply.send({ items: [], total: 0 });
    }

    const total = cart.items.reduce(
      (acc, el) => acc + Number(el.product.price, 10) * el.quantity,
      0
    );

    return reply.code(200).send({ items: cart.items, total });
  });

  fastify.post(
    '/cart',
    {
      schema: {
        body: {
          type: 'object',
          required: ['quantity', 'product_id'],
          properties: {
            quantity: { type: 'integer', minimum: 1 },
            product_id: { type: 'integer', minimum: 1 },
          },
        },
      },
    },
    async (req, reply) => {
      const { quantity, product_id } = req.body;
      const sessionId = req.session.get('session_id');

      if (!sessionId) {
        return reply.code(400).send({ error: 'Session ID is required' });
      }

      let cart = await models.Cart.query().findOne({
        session_id: sessionId,
      });

      if (!cart) {
        cart = await models.Cart.query().insert({ session_id: sessionId });
      }

      const product = await models.Products.query().findById(
        Number(product_id)
      );
      if (!product || product.stock < quantity) {
        return reply
          .status(400)
          .send({ error: 'Invalid product or insufficient stock' });
      }

      const existingItem = await cart
        .$relatedQuery('items')
        .findOne({ product_id });

      if (existingItem) {
        await existingItem
          .$query()
          .patch({ quantity: existingItem.quantity + quantity });
      } else {
        await cart.$relatedQuery('items').insert({ product_id, quantity });
      }

      return reply.code(200).send({ success: true });
    }
  );

  fastify.delete('/cart/:product_id', async (req, reply) => {
    const sessionId = req.session.get('session_id');
    const product_id = req.params.product_id;

    if (!sessionId) {
      return reply.code(400).send({ error: 'Session ID is required' });
    }

    const cart = await models.Cart.query().findOne({ session_id: sessionId });

    const deletedRows = await cart
      .$relatedQuery('items')
      .delete()
      .where({ product_id });

    if (deletedRows === 0) {
      return reply.code(404).send({ error: 'Item not found in cart' });
    }

    return reply.code(200).send({});
  });
};
