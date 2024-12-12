export default async (server) => {
  const { models } = server;
  server.get('/users', async (_, reply) => {
    const users = await models.Users.query();
    return reply.code(200).send(users);
  });
};
