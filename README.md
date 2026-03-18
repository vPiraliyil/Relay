# Relay

Redis-backed distributed job queue built from scratch in Node.js + TypeScript. Features atomic job locking, crash recovery, retry logic with exponential backoff, and a dead-letter queue — no BullMQ or queue libraries used.

## Architecture

<!-- TODO: architecture diagram -->

Four containerised processes:

- **Producer** — Express API. Accepts image uploads, fans out into 4 job types, pushes jobIds onto Redis queue. Also serves admin API endpoints.
- **Worker** — Polls Redis for jobs, acquires a distributed lock, executes a Sharp handler, updates job state. Runs as multiple replicas.
- **Reaper** — Runs on a timer. Detects jobs whose lock TTL has expired (crashed workers), increments attempts, requeues or sends to DLQ.
- **Dashboard** — React admin UI. Reads from the admin API. Shows queue stats, job history, DLQ panel.

All state lives in Redis. All processes are stateless.

## Setup

```bash
# 1. Copy environment config
cp .env.example .env

# 2. Start all services
docker compose up --build

# 3. Access
#    Producer API:  http://localhost:3000
#    Dashboard:     http://localhost:5173
#    Redis:         localhost:6379
```

## Project Structure

```
packages/
  producer/    Express API — upload + admin endpoints
  worker/      Job processor — polling loop + Sharp handlers
  reaper/      Crash recovery — scans for expired locks
  dashboard/   React admin UI
shared/        TypeScript types shared across all packages
```
