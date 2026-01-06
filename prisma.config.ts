import { defineConfig } from '@prisma/config';

export default defineConfig({
  // @ts-expect-error - Prisma 7 Preview types are currently strict/buggy
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});