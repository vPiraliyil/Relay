// Typed configuration — all values from environment variables.

export const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  reaperIntervalMs: parseInt(process.env.REAPER_INTERVAL_MS ?? '5000', 10),
  maxAttempts: parseInt(process.env.MAX_ATTEMPTS ?? '3', 10),
} as const;
