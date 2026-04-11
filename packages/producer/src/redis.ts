import Redis from 'ioredis';
import { config } from './config';

// Each package owns its own Redis connection — no shared singleton across packages.
export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

// Surface connection errors explicitly — ioredis emits 'error' on reconnect
// failures and the default Node behaviour is to crash on unhandled EventEmitter
// errors, so we must attach a handler even when we have nothing to recover from.
redis.on('error', (err: Error) => {
  console.error(`[redis:producer] connection error: ${err.message}`);
});
