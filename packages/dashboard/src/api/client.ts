import type { QueueStats, Job, JobLog } from '../../../../shared/src/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

/** GET /admin/stats — fetch current queue statistics */
export async function fetchStats(): Promise<QueueStats> {
  // TODO: fetch(`${API_BASE}/admin/stats`) and return parsed QueueStats
  throw new Error('Not implemented');
}

/** GET /admin/jobs — fetch jobs, optionally filtered by state */
export async function fetchJobs(state?: string): Promise<Job[]> {
  // TODO: fetch(`${API_BASE}/admin/jobs?state=${state}`) and return parsed Job[]
  throw new Error('Not implemented');
}

/** GET /admin/jobs/:id/logs — fetch log entries for a specific job */
export async function fetchJobLogs(jobId: string): Promise<JobLog[]> {
  // TODO: fetch(`${API_BASE}/admin/jobs/${jobId}/logs`) and return parsed JobLog[]
  throw new Error('Not implemented');
}

/** POST /admin/jobs/:id/retry — requeue a dead job from the DLQ */
export async function retryJob(jobId: string): Promise<void> {
  // TODO: fetch(`${API_BASE}/admin/jobs/${jobId}/retry`, { method: 'POST' })
  throw new Error('Not implemented');
}
