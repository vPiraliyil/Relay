import { Job } from '@relay/shared/src/types';

/**
 * Reaper scan — called on a timer by index.ts.
 *
 * 1. ZRANGEBYSCORE queue:active 0 <now> — find all jobs whose lock has expired
 * 2. For each expired job:
 *    a. HGET job:<id> to read current state and attempts
 *    b. HINCRBY job:<id> attempts 1
 *       — The reaper increments attempts rather than the worker because the worker
 *         may have crashed before it could update the counter. The reaper is the
 *         single authority on retry accounting for recovered jobs.
 *    c. If attempts >= maxAttempts:
 *       - Set state to 'dead'
 *       - RPUSH jobId to queue:dlq
 *       - ZREM from queue:active
 *    d. Else:
 *       - Set state to 'pending'
 *       - RPUSH jobId to queue:pending
 *       - ZREM from queue:active
 *    e. DEL lock:job:<id> (clean up the expired lock key)
 *    f. Log the recovery action to job:<id>:logs
 *
 * A failure recovering one job must not stop processing of remaining jobs.
 */
export async function reap(): Promise<void> {
  // TODO: implement reaper scan
}
