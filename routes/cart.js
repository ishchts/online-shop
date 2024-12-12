export default async (server) => {
  const { models } = server;
  server.get('/cart', async (_, reply) => {
    const cart = await models.Cart.query();
    return reply.send(200).send(cart);
  });
};
