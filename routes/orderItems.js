export default async (server) => {
  const { models } = server;
  server.get('/orderItems', async (_, reply) => {
    const orderItems = await models.OrderItems.query();
    return reply.code(200).send(orderItems);
  });
};
