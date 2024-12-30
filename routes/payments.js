export default async (fastify) => {
  const { models } = fastify;
  fastify.get('/payments', async (_, reply) => {
    const payments = await models.Payments.query();
    return reply.code(200).send(payments);
  });

  fastify.post('/payments', async (req, reply) => {
    const uuid = req.headers['idempotence-key'];
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const credentials = Buffer.from(`${shopId}:${secretKey}`).toString(
      'base64'
    );
    const { return_url, description, order_id, metadata } = req.body;

    const order = await models.Orders.query().findById(order_id);
    if (!order) {
      return reply.status(404).send({ error: 'Order not found' });
    }

    const url = 'https://api.yookassa.ru/v3/payments';

    try {
      const payment = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': uuid,
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          description,
          amount: {
            value: Number(order.total_price).toFixed(2),
            currency: 'RUB',
          },
          capture: false,
          confirmation: {
            type: 'redirect',
            return_url,
          },
          metadata: {
            ...metadata,
            order_id,
          },
          test: true,
        }),
      });
      const json = await payment.json();

      await order.$relatedQuery('payments').patch({
        payment_status: 'waiting',
      });

      return reply.code(200).send(json);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.post('/payments/webhook', async (req, reply) => {
    const { object } = req.body;

    if (object.status === 'succeeded') {
      await models.Orders.query()
        .patch({
          status: 'paid',
        })
        .where('id', object.metadata.order_id);
    } else if (object.status === 'canceled') {
      await models.Orders.query()
        .patch({
          status: 'canceled',
        })
        .where('id', object.metadata.order_id);
    }

    return reply.code(200).send({});
  });
};
