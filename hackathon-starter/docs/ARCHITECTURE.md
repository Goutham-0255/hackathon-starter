# Architecture

```
Browser ──> Vercel (React SPA, CDN)
               │  fetch VITE_API_URL
               ▼
           Render (Express API) ──> Neon (PostgreSQL)
```

## Request flow (backend)

1. `helmet` sets security headers, `cors` allows only the configured frontend origin.
2. `express.json` parses the body (limited to 1 MB).
3. `pino-http` logs method, URL, status and response time.
4. The route runs `validate(...)` (Zod). Invalid input -> `400` via `AppError`.
5. Controller reads validated input from `res.locals`, calls the service.
6. Service applies business rules, calls the repository.
7. Repository talks to Prisma (or memory).
8. Any thrown error lands in `errorHandler` -> consistent JSON response.

## Patterns used

| Pattern | Where | Why |
| ------- | ----- | --- |
| Layered architecture | `backend/src/modules/*` | Separation of concerns, testable services |
| Repository pattern + dependency injection | `*.repository.ts`, `createApp(repos)` | Swap storage, test without DB |
| Validation at the edge | `middleware/validate.ts`, `*.schema.ts` | Never trust client input |
| Fail-fast config | `config/env.ts` | Misconfiguration fails at boot, not mid-request |
| Centralised error handling | `middleware/errorHandler.ts` | One error format, no leaked internals |
| Structured logging | `lib/logger.ts` | Searchable JSON logs in production |
| Graceful shutdown | `index.ts` | No dropped requests on redeploy |
| Health check | `GET /health` | Used by Render to know the app is up |
| Lazy loading / code splitting | `frontend/src/App.tsx` | Smaller initial bundle |
| Single API client | `frontend/src/api/client.ts` | One place for base URL and errors |
| Error boundary | `frontend/src/components/ErrorBoundary.tsx` | A crash shows a message, not a blank page |
| Loading / error / data states | `frontend/src/hooks/useAsync.ts` | Consistent UX on every page |
| Versioned migrations | `backend/prisma/migrations` | Reproducible schema in every environment |

## Nice to have (not built, would add with more time)

- Authentication (JWT or session cookies) and role-based access
- Pagination and filtering on list endpoints
- Caching (HTTP cache headers, or Redis for hot reads)
- Rate limiting on public endpoints
- CI pipeline (typecheck + tests on every PR)
- End-to-end tests (Playwright)
- Request IDs propagated to logs for tracing
