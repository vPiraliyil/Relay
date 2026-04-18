import Redis from 'ioredis';
import { config } from './config';

// Each package owns its own Redis connection — no shared singleton across packages.
// maxRetriesPerRequest: null is required for BLPOP: by default ioredis limits
// retries per command and throws after reconnects, which would abort the blocking
// poll loop. null disables that limit so BLPOP survives transient disconnections.
export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null,
});

// Surface connection errors explicitly — see note in producer/redis.ts.
redis.on('error', (err: Error) => {
  console.error(`[redis:worker] connection error: ${err.message}`);
});
