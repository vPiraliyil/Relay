import { Job, JobType } from '@relay/shared/src/types';
import { acquireLock, releaseLock } from './lock';
import { resizeThumbnail } from './handlers/resizeThumbnail';
import { resizeMedium } from './handlers/resizeMedium';
import { stripExif } from './handlers/stripExif';
import { convertWebp } from './handlers/convertWebp';

type JobHandler = (imageUrl: string, outputDir: string, jobId: string) => Promise<void>;

const handlers: Record<JobType, JobHandler> = {
  resize_thumbnail: resizeThumbnail,
  resize_medium: resizeMedium,
  strip_exif: stripExif,
  convert_webp: convertWebp,
};

/**
 * Main polling loop. Runs indefinitely:
 *   1. BLPOP from queue:pending (blocks until a job is available)
 *   2. Acquire a distributed lock via SET NX PX
 *   3. Transition job state to 'active', ZADD to queue:active with lock expiry as score
 *   4. Dispatch to the correct handler based on job type
 *   5. On success: transition to 'completed', release lock, remove from queue:active
 *   6. On failure: transition to 'failed', increment attempts, release lock
 *      — if attempts >= maxAttempts, move to DLQ with state 'dead'
 *      — otherwise, RPUSH back to queue:pending for retry
 */
export async function pollLoop(): Promise<never> {
  // TODO: implement polling loop
  while (true) {
    // TODO: BLPOP, lock, dispatch, state transitions
  }
}
