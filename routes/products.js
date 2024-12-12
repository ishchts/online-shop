export default async (server) => {
  const { models } = server;

  server.get('/products', async (_, reply) => {
    const products = await models.Products.query();
    return reply.code(200).send(products);
  });
};
