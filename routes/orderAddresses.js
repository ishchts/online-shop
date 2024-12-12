export default async (server) => {
  const { models } = server;
  server.get('/orderAddresses', async (_, reply) => {
    const orderAddresses = await models.OrderAddresses.query();
    return reply.code(200).send(orderAddresses);
  });
};
