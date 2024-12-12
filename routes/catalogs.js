export default async (server) => {
  const { models } = server;
  server.get('/catalogs', async (req, reply) => {
    const catalogs = await models.Catalogs.query();
    return reply.code(200).send(catalogs);
  });
};
