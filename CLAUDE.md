# CLAUDE.md

## Project context

This is a distributed job queue system built from scratch in Node.js and TypeScript,
backed by Redis. It is a portfolio project built to demonstrate deep backend and
systems engineering knowledge. It will be showcased on a personal portfolio site
and discussed in technical interviews.

The engineer building this is a 3rd year Software Engineering student with strong
frontend skills who is deepening their backend and distributed systems knowledge.
Code quality, explainability, and professional engineering standards matter as much
as correctness.

---

## Architecture overview

Four containerised processes:

- **Producer** — Express API. Accepts image uploads, fans out into 4 job types,
  pushes jobIds onto Redis queue.
- **Worker** — Polls Redis for jobs, acquires a lock, executes a Sharp handler,
  updates job state. Runs as multiple replicas.
- **Reaper** — Runs on a timer. Detects jobs whose lock TTL has expired and
  recovers them — incrementing attempts, routing to pending or DLQ.
- **Dashboard** — React admin UI. Reads from the admin API. Shows queue stats,
  job history, DLQ panel.

All state lives in Redis. All processes are stateless.

---

## Redis key schema

These are the only Redis keys the system uses. Never introduce new key patterns
without updating this list.
```
job:<id>           HASH    id, type, imageUrl, state, attempts, maxAttempts, createdAt, workerLockedBy
queue:pending      LIST    jobIds — RPUSH to enqueue, BLPOP to dequeue
queue:active       ZSET    jobId → lock expiry timestamp (score)
queue:dlq          LIST    jobIds that exhausted retries
job:<id>:logs      LIST    per-attempt log strings
lock:job:<id>      STRING  workerId — SET NX PX <ttl>, auto-expires
job:<id>:step      STRING  current step name — written by the worker as it progresses
```

All Redis key strings must be defined as constants in a `keys.ts` file per package.
No magic strings anywhere else in the codebase.

---

## Engineering principles to follow at all times

### TypeScript
- Strict mode always. Zero `any` types — use `unknown` and narrow it.
- Interfaces and types live in `shared/src/types.ts` unless they are truly
  local to one package.
- Prefer explicit return types on all exported functions.

### Error handling
- No silent failures. Every error must be caught, logged with context, and
  handled explicitly.
- A job failing should never crash the worker process — catch at the job level,
  not the process level.
- The reaper failing to recover one job should not stop it from processing the rest.

### Redis operations
- Any operation that must be atomic uses a Lua script or a Redis transaction.
  Never assume two sequential commands are atomic.
- Lock acquisition always uses SET NX PX — never a GET followed by a SET.
- Always check lock ownership before releasing — a worker must never release
  a lock it does not own.

### Idempotency
- Every job handler must be safe to run more than once with the same input.
- Sharp output is always written to a deterministic temp path derived from jobId,
  then renamed atomically. Never write directly to the final output path.

### Configuration
- No hardcoded values anywhere. Every configurable value comes from environment
  variables via a typed config module per package.
- All environment variables are documented in .env.example with sensible defaults.

---

## Code comment standards

Comments explain the **why**, not the what. A comment that says
"increment the attempt counter" on a line that increments the attempt counter
adds no value and should not exist.

Comments that must always be present:

- Above the lock acquisition block — explain why SET NX is used and what happens
  if acquisition fails
- Above the reaper's HINCRBY call — explain why the reaper increments attempts
  rather than the worker
- Above any Lua script — explain what atomicity guarantee it provides and why
  that guarantee is necessary
- Above the ZADD to queue:active — explain the role of the score and how the
  reaper uses it
- Above each SET to job:<id>:step — explain what this enables for the dashboard

---

## Git and commit standards

Conventional commit format always:
```
feat:     new capability
fix:      bug fix
chore:    tooling, config, deps
docs:     readme, comments, diagrams
refactor: restructure without behaviour change
test:     test files only
```

Commit messages describe what changed and why, not just what.

Good:  `feat: add exponential backoff to retry logic to prevent thundering herd`
Bad:   `feat: update worker.ts`

---

## Branching strategy

All branches off `main` via `dev`. Feature branches merge into `dev`; `dev` merges
into `main` at phase completion.

### Naming conventions

| Prefix | Purpose |
|---|---|
| `feat/` | Feature implementation (tests included) |
| `docs/` | Documentation only |
| `chore/` | Config, tooling, setup |
| `fix/` | Bug fixes |

All branch names: lowercase kebab-case.

### Branch list

#### Setup
- `chore/redis-setup` — Docker Compose, Redis config, ioredis connection, `keys.ts`

#### Phase 1
- `feat/producer` — Express server, `POST /upload`, job record creation, enqueue to `queue:pending`; includes producer tests
- `feat/worker` — polling loop, lock acquisition, Sharp handlers, job state updates; includes worker tests

#### Phase 2
- `feat/reaper` — lock expiry scan, attempt increment, requeue vs DLQ logic, exponential backoff; includes reaper tests

#### Phase 3
- `feat/admin-api` — queue stats endpoint, job list endpoint, DLQ endpoint, manual retry endpoint; includes API tests
- `feat/dashboard` — React app, stats panel, job table, DLQ panel, polling
- `docs/create-readme` — architecture diagram, setup instructions, design decisions
- `docs/api-docs` — endpoint documentation with request/response examples

#### Phase 4 — Job Tracking (Observability)
- `feat/job-tracking` — backend tracking logic: record which step each job is currently in, persist step state to Redis, expose via API; includes tests
- `feat/job-tracking-ui` — dashboard UI element showing which step the job is in (pending → resize_thumbnail → resize_medium → strip_exif → convert_webp → completed)
- `docs/job-tracking` — document the tracking data model and any new API endpoints

---

## File structure rules

- Each package owns its own `redis.ts` connection module — no shared singleton
  across packages
- Route handlers in `routes/` are thin — they validate input and call a service
- Business logic lives in `services/` — never directly in route handlers
- Sharp is called only inside `handlers/` — one file per job type, one function
  per file
- The reaper's recovery logic lives in `reaper.ts` — `index.ts` only starts
  the interval

---

## Known constraints and tradeoffs to be aware of

- BLPOP guarantees only one worker dequeues a job — but a separate SET NX lock
  is still required to cover the active processing window
- Lock TTL is a tradeoff between recovery speed and false-positive requeues —
  if TTL is too short, healthy slow jobs get requeued mid-execution
- The reaper is a single point of failure — if it crashes, stale jobs accumulate
  until it restarts. This is a known limitation, documented in the README.
- Workers are horizontally scalable — adding replicas increases throughput but
  also increases lock contention on Redis at high volume
- All job handlers must be idempotent because the retry and recovery mechanisms
  guarantee at-least-once execution, not exactly-once

---

## What this project is not

- Not a UI showcase — the dashboard exists only to make the system observable
- Not a Sharp showcase — image processing is a one-liner, intentionally trivial
- Not over-engineered — solve the problem at hand, document the tradeoffs,
  move on

---

## Definition of done per phase

**Phase 1** — Uploading an image fans out into 4 jobs visible in Redis.
Workers poll and process them. States transition correctly.

**Phase 2** — A simulated worker crash results in the job being requeued by
the reaper. A job that fails maxAttempts times ends up in the DLQ.
Two workers running simultaneously never process the same job.

**Phase 3** — The dashboard shows live queue stats and job history.
The README is complete enough that someone with no context can run the
system with a single command and understand every design decision.

**Phase 4** — Each job records its current step in Redis as it progresses
through the pipeline. A new API endpoint exposes per-job step state. The
dashboard shows the user which step their job is currently in. Implemented,
tested, and explainable without referring to the code.