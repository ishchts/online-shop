import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import knex from 'knex';
import { Model } from 'objection';
import { User } from './models/User.js';
import knexConfig from './knexfile.js';

Model.knex(knex(knexConfig));

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger'
    }
  }
})

await server.register(FastifyVite, { 
  root: import.meta.url, 
  renderer: '@fastify/react',
})

await server.vite.ready()

server.decorate('db', {
  todoList: [
    'Do laundry',
    'Respond to emails',
    'Write report',
  ]
})


server.get('/api/users', async (req, reply) => {
  const users = await User.query();
  reply.code(200).send(users);
});

server.put('/api/todo/items', (req, reply) => {
  server.db.todoList.push(req.body)
  reply.send({ ok: true })
})

server.delete('/api/todo/items', (req, reply) => {
  server.db.todoList.splice(req.body, 1)
  reply.send({ ok: true })
})

await server.listen({
  port: parseInt(process.env.PORT),
  host: '0.0.0.0'
})
