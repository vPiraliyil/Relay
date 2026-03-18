export type JobType =
  | 'resize_thumbnail'
  | 'resize_medium'
  | 'strip_exif'
  | 'convert_webp';

export type JobState =
  | 'pending'
  | 'active'
  | 'completed'
  | 'failed'
  | 'dead';

export interface JobPayload {
  imageUrl: string;    // path to the uploaded file
  outputDir: string;   // where to write processed output
}

export interface Job {
  id: string;
  type: JobType;
  payload: JobPayload;
  state: JobState;
  attempts: number;
  maxAttempts: number;
  createdAt: number;         // unix timestamp ms
  workerLockedBy?: string;   // workerId currently holding the lock
}

export interface JobLog {
  jobId: string;
  attempt: number;
  message: string;
  timestamp: number;
}

export interface QueueStats {
  pending: number;
  active: number;
  completed: number;
  failed: number;
  dlq: number;
}
