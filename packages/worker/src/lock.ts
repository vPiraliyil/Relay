/**
 * Acquire a distributed lock for a job.
 * Uses SET NX PX — the lock is only granted if no other worker holds it,
 * and it auto-expires after ttlMs to prevent deadlocks from crashed workers.
 *
 * Returns true if the lock was acquired, false otherwise.
 */
export async function acquireLock(jobId: string, workerId: string, ttlMs: number): Promise<boolean> {
  // TODO: SET lock:job:<id> <workerId> NX PX <ttlMs>
  // TODO: return true if SET succeeded, false if key already exists
  return false;
}

/**
 * Release a distributed lock for a job.
 * Must verify ownership before deleting — a worker must never release a lock it does not own.
 * Uses a Lua script to make the check-and-delete atomic.
 */
export async function releaseLock(jobId: string, workerId: string): Promise<boolean> {
  // TODO: Lua script: if GET lock:job:<id> == workerId then DEL lock:job:<id> return 1 else return 0
  // TODO: return true if lock was released, false if not owned
  return false;
}
