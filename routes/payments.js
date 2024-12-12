export default async (server) => {
  const { models } = server;
  server.get('/payments', async (_, reply) => {
    const payments = await models.Payments.query();
    return reply.code(200).send(payments);
  });
};
