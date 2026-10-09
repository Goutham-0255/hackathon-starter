import { createApp } from './app';
import { env } from './config/env';
import { logger } from './lib/logger';

const server = createApp().listen(env.PORT, () => {
  logger.info(`API listening on http://localhost:${env.PORT} (storage: ${env.STORAGE})`);
});

// Graceful shutdown: finish in-flight requests before the process exits
// (Render sends SIGTERM on every redeploy).
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    logger.info(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
  });
}
