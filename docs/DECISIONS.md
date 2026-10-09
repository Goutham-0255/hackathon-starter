# Decision Log

Short records of the important choices: what, why, and what was traded off.
Add one entry per decision while building, not at the end.

## 001: TypeScript on both frontend and backend
- **Why:** one language end to end, shared mental model, type errors caught before running.
- **Trade-off:** a build step on the backend.

## 002: Layered backend (routes -> controller -> service -> repository)
- **Why:** each layer has one job. Business logic (service) has no HTTP or SQL in it,
  so it is easy to test and to explain. Storage can change without touching the service.
- **Trade-off:** a few more files per feature than putting everything in one route handler.

## 003: Repository interface with Prisma and in-memory implementations
- **Why:** tests run without a database, and the app can run with `STORAGE=memory`
  if the database is unavailable or not needed.
- **Trade-off:** two implementations to keep in sync.

## 004: Validate all input with Zod at the edge
- **Why:** bad input is rejected with a 400 and a clear message before it reaches
  business logic. Environment variables are validated the same way at startup.

## 005: Central error handler with `AppError`
- **Why:** consistent error JSON, no leaked stack traces, no try/catch in controllers
  (Express 5 forwards async errors automatically).

## 006: Lazy-loaded routes on the frontend
- **Why:** each page is its own chunk, so the first load downloads only what it needs.

## 007: Split hosting: Vercel (frontend) + Render (API) + Neon (Postgres)
- **Why:** static frontend served from a CDN loads instantly, API and DB scale independently,
  all on free tiers.
- **Trade-off:** CORS and an API URL variable to configure; Render free tier sleeps
  after inactivity (first request can take ~50s).

<!-- Add hackathon-specific decisions below, e.g. data model, scope cuts. -->
