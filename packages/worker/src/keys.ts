// All Redis key patterns for the worker package.
// No magic strings — every key used in Redis must be defined here.

export const KEYS = {
  job: (id: string) => `job:${id}` as const,
  jobLogs: (id: string) => `job:${id}:logs` as const,
  jobStep: (id: string) => `job:${id}:step` as const,
  lock: (id: string) => `lock:job:${id}` as const,
  QUEUE_PENDING: 'queue:pending',
  QUEUE_ACTIVE: 'queue:active',
  QUEUE_DLQ: 'queue:dlq',
} as const;
