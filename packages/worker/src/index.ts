import { config } from './config';
import { pollLoop } from './worker';

// Entry point — starts the worker polling loop.
// TODO: log workerId and concurrency on startup
// TODO: call pollLoop() to begin processing jobs
