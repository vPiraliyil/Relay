import { config } from './config';
import { reap } from './reaper';

// Entry point — starts the reaper on a recurring interval.
// index.ts only starts the interval — all recovery logic lives in reaper.ts.
// TODO: setInterval(reap, config.reaperIntervalMs)
// TODO: log startup message with interval
