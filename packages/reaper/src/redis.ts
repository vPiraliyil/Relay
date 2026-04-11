import Redis from 'ioredis';
import { config } from './config';

// Each package owns its own Redis connection — no shared singleton across packages.
export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

// Surface connection errors explicitly — see note in producer/redis.ts.
redis.on('error', (err: Error) => {
  console.error(`[redis:reaper] connection error: ${err.message}`);
});
