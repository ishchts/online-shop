import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import viteFastifyReact from '@fastify/react/plugin';
import viteReact from '@vitejs/plugin-react';

const path = fileURLToPath(import.meta.url);

export default {
  root: join(dirname(path), 'client'),
  plugins: [viteReact(), viteFastifyReact()],
  ssr: {
    external: ['use-sync-external-store'],
    noExternal: ['@mui/icons-material'],
  },
};
