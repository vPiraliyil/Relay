import { Job, JobType } from '@relay/shared/src/types';

const JOB_TYPES: JobType[] = [
  'resize_thumbnail',
  'resize_medium',
  'strip_exif',
  'convert_webp',
];

/**
 * Fan-out: given an uploaded image, creates one Job per job type (4 total),
 * stores each as a Redis hash, and pushes all jobIds onto queue:pending.
 * Returns the created Job objects.
 */
export async function fanOut(imageUrl: string, outputDir: string): Promise<Job[]> {
  // TODO: for each JOB_TYPES entry:
  //   1. generate a unique jobId (uuid)
  //   2. create a Job object with state 'pending', attempts 0
  //   3. HSET job:<id> with all fields
  //   4. RPUSH jobId onto queue:pending
  // TODO: return all created jobs
  return [];
}
