import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { logger } from './lib/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import {
  InMemoryHelloRepository,
  PrismaHelloRepository,
  type HelloRepository,
} from './modules/hello/hello.repository';
import { helloRoutes } from './modules/hello/hello.routes';

type Repositories = { hello: HelloRepository };

// Pick storage once, here. Tests pass their own in-memory repositories.
function defaultRepositories(): Repositories {
  return env.STORAGE === 'prisma'
    ? { hello: new PrismaHelloRepository() }
    : { hello: new InMemoryHelloRepository() };
}

// Building the app in a function (separate from listen()) lets tests use it directly.
export function createApp(repositories: Repositories = defaultRepositories()) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigins }));
  app.use(express.json({ limit: '1mb' }));
  app.use(
    pinoHttp({
      logger,
      // Keep request logs short: method, url, status and response time.
      serializers: {
        req: (req) => ({ method: req.method, url: req.url }),
        res: (res) => ({ statusCode: res.statusCode }),
      },
    }),
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', storage: env.STORAGE, uptime: process.uptime() });
  });

  app.use('/api/hello', helloRoutes(repositories.hello));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
