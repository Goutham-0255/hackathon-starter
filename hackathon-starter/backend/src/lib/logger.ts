import pino from 'pino';
import { env } from '../config/env';

// Structured JSON logs in production, readable coloured logs in development.
export const logger = pino({
  level: env.NODE_ENV === 'test' ? 'silent' : 'info',
  transport: env.isProduction ? undefined : { target: 'pino-pretty' },
});
