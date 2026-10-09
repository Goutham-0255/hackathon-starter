import { z } from 'zod';

export const greetQuerySchema = z.object({
  name: z.string().trim().min(1).max(50).default('world'),
});

export type GreetQuery = z.infer<typeof greetQuerySchema>;
