import { PrismaClient } from '@prisma/client';

// One shared client for the whole app; Prisma manages a connection pool internally.
export const prisma = new PrismaClient();
