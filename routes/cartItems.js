export default async (server) => {
  const { models } = server;
  server.get('/cartItems', async (_, reply) => {
    const cartItems = await models.CartItems.query();
    return reply.code(200).send(cartItems);
  });
};
