import 'dotenv/config';
import { z } from 'zod';

// Validate environment variables once at startup so the app fails fast
// with a clear message instead of crashing later on a missing value.
const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(4000),
    STORAGE: z.enum(['prisma', 'memory']).default('memory'),
    DATABASE_URL: z.string().optional(),
    CORS_ORIGIN: z.string().default('http://localhost:5173'),
  })
  .refine((env) => env.STORAGE !== 'prisma' || !!env.DATABASE_URL, {
    message: 'DATABASE_URL is required when STORAGE=prisma',
    path: ['DATABASE_URL'],
  });

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
  isProduction: parsed.data.NODE_ENV === 'production',
};
