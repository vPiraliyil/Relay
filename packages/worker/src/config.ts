// Typed configuration — all values from environment variables.

export const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  workerId: process.env.WORKER_ID ?? 'worker-unknown',
  concurrency: parseInt(process.env.WORKER_CONCURRENCY ?? '1', 10),
  jobLockTtlMs: parseInt(process.env.JOB_LOCK_TTL_MS ?? '30000', 10),
  maxAttempts: parseInt(process.env.MAX_ATTEMPTS ?? '3', 10),
  uploadDir: process.env.UPLOAD_DIR ?? './uploads',
  outputDir: process.env.OUTPUT_DIR ?? './outputs',
} as const;
