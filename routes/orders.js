export default async (server) => {
  const { models } = server;
  server.get('/orders', async (_, reply) => {
    const orders = await models.Orders.query();
    return reply.code(200).send(orders);
  });
};
