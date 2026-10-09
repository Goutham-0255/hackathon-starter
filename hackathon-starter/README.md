# <Project Name>

> One or two sentences: what problem this solves and for whom.

**Live demo:** submitted separately via the form (not committed, per the rules).

## Features

- [ ] Feature 1
- [ ] Feature 2

## Tech stack

| Layer    | Choice                                   | Why                                                   |
| -------- | ---------------------------------------- | ----------------------------------------------------- |
| Frontend | React 19, Vite, TypeScript, React Router | Fast dev server, typed components, lazy-loaded routes |
| Backend  | Node 22, Express 5, TypeScript, Zod      | Simple, typed, input validated at the edge            |
| Database | PostgreSQL (Neon) via Prisma             | Relational data, typed queries, versioned migrations  |
| Hosting  | Vercel (frontend), Render (API)          | Free tiers, deploy on push to `main`                  |

More detail in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/DECISIONS.md](docs/DECISIONS.md).

## Assumptions

- Assumption 1 (and why it was reasonable)
- Assumption 2

## Project structure

```
backend/
  prisma/              schema + migrations
  src/
    config/env.ts      validated environment variables
    lib/               logger, AppError
    middleware/        validation, 404, central error handler
    modules/<feature>/ routes -> controller -> service -> repository
    app.ts             builds the Express app (used by server and tests)
    index.ts           starts the server
  tests/               API tests (Vitest + Supertest)
frontend/
  src/
    api/               typed API client, one file per resource
    components/        shared UI (Layout, Loader, ErrorMessage, ErrorBoundary)
    hooks/             useAsync (loading / error / data)
    pages/             one lazy-loaded component per route
```

## Running locally

Requirements: Node 20+ and npm. A database is optional (see `STORAGE`).

```bash
# 1. Backend (http://localhost:4000)
cd backend
cp .env.example .env        # set STORAGE=memory to run without a database
npm install
npm run db:deploy           # only when STORAGE=prisma: creates the tables
npm run dev

# 2. Frontend (http://localhost:5173), in a second terminal
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### Useful commands

| Where    | Command                             | What it does                        |
| -------- | ----------------------------------- | ----------------------------------- |
| backend  | `npm test`                          | Runs API tests (no database needed) |
| backend  | `npm run typecheck`                 | Type-checks without building        |
| backend  | `npm run db:migrate -- --name <x>`  | Creates a migration after a schema change |
| backend  | `npm run db:studio`                 | Opens a GUI for the database        |
| frontend | `npm run build`                     | Type-checks and builds for production |

## API

| Method | Path         | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `/health`    | Liveness check               |
| GET    | `/api/hello` | Scaffold endpoint (`?name=`) |

Errors always look like `{ "error": { "message": "...", "details": ... } }`.

## Known limitations and next steps

- Limitation 1
- What I would build next with more time

## AI usage

See [AI_USAGE.md](AI_USAGE.md).
