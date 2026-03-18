// Typed configuration — all values from environment variables, no hardcoded defaults in business logic.

export const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  port: parseInt(process.env.PORT ?? '3000', 10),
  uploadDir: process.env.UPLOAD_DIR ?? './uploads',
  outputDir: process.env.OUTPUT_DIR ?? './outputs',
  maxAttempts: parseInt(process.env.MAX_ATTEMPTS ?? '3', 10),
} as const;
