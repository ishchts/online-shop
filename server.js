import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import fastifyAutoload from '@fastify/autoload';
import fastifySecureSession from '@fastify/secure-session';
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

server.register(fastifySecureSession, {
  key: Buffer.from(process.env.COOKIE_KEY, 'hex'),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
});

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

server.addHook('preHandler', async (request, _) => {
  if (!request.session.get('session_id')) {
    const sessionId = generateUniqueId();
    request.session.set('session_id', sessionId);
  }
});

await server.listen({
  port: parseInt(process.env.PORT),
  host: '0.0.0.0',
});
