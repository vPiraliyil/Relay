import type { Job } from '../../../../shared/src/types';

/**
 * Displays dead-letter queue jobs with a retry button for each.
 * Calls POST /admin/jobs/:id/retry to requeue a dead job.
 */
export function DlqPanel(): React.JSX.Element {
  // TODO: accept DLQ jobs as props or fetch from context
  // TODO: render list of dead jobs with retry buttons

  return (
    <section>
      {/* TODO: render DLQ panel */}
    </section>
  );
}
