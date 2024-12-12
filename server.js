import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import fastifyAutoload from '@fastify/autoload';
import FastifyVite from '@fastify/vite';
import Fastify from 'fastify';
import knex from 'knex';
import { Model } from 'objection';

import knexConfig from './knexfile.js';
import * as models from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

Model.knex(knex(knexConfig));

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

await server.register(FastifyVite, {
  root: import.meta.url,
  renderer: '@fastify/react',
});

await server.vite.ready();

server.decorate('models', models);

server.register(fastifyAutoload, {
  dir: join(__dirname, 'routes'),
  options: { prefix: '/api/v1' },
});

await server.listen({
  port: parseInt(process.env.PORT),
  host: '0.0.0.0',
});
