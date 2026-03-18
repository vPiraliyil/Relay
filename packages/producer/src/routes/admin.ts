import { Router, Request, Response } from 'express';

export const adminRouter = Router();

// GET /admin/stats — returns QueueStats (counts of pending, active, completed, failed, dlq)
adminRouter.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  // TODO: query Redis for queue lengths and return QueueStats
});

// GET /admin/jobs — returns a list of jobs with optional state filter
adminRouter.get('/jobs', async (req: Request, res: Response): Promise<void> => {
  // TODO: scan job keys, filter by query param ?state=, return Job[]
});

// GET /admin/jobs/:id/logs — returns log entries for a specific job
adminRouter.get('/jobs/:id/logs', async (req: Request, res: Response): Promise<void> => {
  // TODO: read job:<id>:logs list from Redis and return JobLog[]
});

// POST /admin/jobs/:id/retry — requeues a dead job from the DLQ
adminRouter.post('/jobs/:id/retry', async (req: Request, res: Response): Promise<void> => {
  // TODO: reset job state to pending, reset attempts, remove from DLQ, push to queue:pending
});
