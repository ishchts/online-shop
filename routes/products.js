export default async (fastify) => {
  const { models } = fastify;

  fastify.get('/products', async (req, reply) => {
    const { page = 1, pageSize = 10 } = req.query;
    const products = await models.Products.query()
      .page(page - 1, pageSize)
      .orderBy('id', 'asc');

    return reply.code(200).send(products);
  });

  fastify.get('/products/:id', async (req, reply) => {
    const product = await models.Products.query().findById(
      parseInt(req.params.id, 10)
    );

    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    return reply.code(200).send(product);
  });

  // Создание нового продукта (администратор)
  fastify.post('/products', async (request, reply) => {
    const { name, description, price, stock, catalog_id } = request.body;
    const newProduct = await models.Product.query().insert({
      name,
      description,
      price,
      stock,
      catalog_id,
    });
    reply.status(201).send(newProduct);
  });

  // Создание нового продукта (администратор)
  fastify.patch('/products/:id', async (req, reply) => {
    const parsedBody = JSON.parse(req.body);
    const updatedProduct =
      await fastify.models.Products.query().patchAndFetchById(
        parseInt(req.params.id, 10),
        {
          ...parsedBody,
          name: 'iphone 16',
          stock: 1000,
        }
      );

    if (!updatedProduct) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    return reply.code(201).send(updatedProduct);
  });

  // Удаление продукта (администратор)
  fastify.delete('/products/:id', async (req, reply) => {
    const deletedRows = await models.Products.query().deleteById(
      parseInt(req.params.id)
    );

    if (deletedRows === 0) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    return reply.code(200).send(deletedRows);
  });
};
