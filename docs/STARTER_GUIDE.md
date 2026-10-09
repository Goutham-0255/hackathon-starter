# Starter Guide (read tonight, delete this file from the submission repo)

## Tonight: dry run (about 45 minutes)

1. **Install:** Node 22 (`node -v`), Git, VS Code. Log in to GitHub, Vercel, Render and Neon
   (sign up with GitHub on all three so they connect easily).
2. **Run locally with no database:**
   - `cd backend && cp .env.example .env`, set `STORAGE=memory`, `npm install`, `npm test`, `npm run dev`
   - `cd frontend && cp .env.example .env.local && npm install && npm run dev`
   - Open http://localhost:5173. You should see "Hello, world!".
3. **Create the database:** Neon -> New project -> copy the connection string.
   Put it in `backend/.env` as `DATABASE_URL`, set `STORAGE=prisma`, then
   `npm run db:deploy` and restart `npm run dev`. The visit count should now survive restarts.
4. **Push to a practice repo:** `git init`, commit, create a GitHub repo, push.
5. **Deploy the API on Render:** New -> Blueprint -> pick the repo (it reads `render.yaml`).
   Fill `DATABASE_URL` and, for now, `CORS_ORIGIN=http://localhost:5173`.
   Check `https://<your-api>.onrender.com/health`.
6. **Deploy the frontend on Vercel:** New Project -> pick the repo -> Root Directory `frontend`.
   Add env var `VITE_API_URL=https://<your-api>.onrender.com`. Deploy.
7. **Connect them:** on Render set `CORS_ORIGIN=https://<your-app>.vercel.app` (comma-separate
   to also keep localhost). Open the Vercel URL: you should see "Hello, world!".
8. Keep the Neon project and the Render/Vercel accounts. Tomorrow you only create a new repo
   and point new services at it (or reuse the same Neon database with a fresh schema).

## Tomorrow at the start (about 10 minutes)

1. Copy this starter into a new folder named after the project. Delete this file.
2. `git init && git add . && git commit -m "chore: initial scaffold from personal starter template"`
3. Create the GitHub repo (public, or private and shared with the organisers), push.
4. Apply the removal checklist below if a part is not needed.

## Removal checklist

### No database needed (about 5 minutes)
1. `backend/.env` and `render.yaml`: set `STORAGE=memory`, remove `DATABASE_URL`.
2. In `backend/src/config/env.ts` change the `STORAGE` enum to just `'memory'` (or leave it).
3. Delete `backend/prisma/` and `backend/src/db/`, remove `PrismaHelloRepository` from repositories,
   and its branch in `defaultRepositories()` in `app.ts`.
4. `npm uninstall prisma @prisma/client`, remove the `db:*` and `postinstall` scripts,
   and `&& npx prisma migrate deploy` from `render.yaml`.
5. `npm run typecheck && npm test`.

### No frontend needed
1. Delete `frontend/`. Remove the Vercel row from the README and docs.
2. CORS can stay; it does no harm.

### No backend needed (frontend only)
1. Delete `backend/` and `render.yaml`.
2. Replace `frontend/src/api/*` calls with local data or `localStorage`.

## Adding a new feature (the pattern to copy)

Copy `backend/src/modules/hello/` to `modules/<feature>/` and rename:
1. `prisma/schema.prisma`: add the model, then `npm run db:migrate -- --name add_<feature>`
2. `<feature>.schema.ts`: Zod schemas for body / query / params
3. `<feature>.repository.ts`: interface + Prisma + in-memory implementations
4. `<feature>.service.ts`: business rules, throws `AppError` for expected failures
5. `<feature>.controller.ts`: reads `res.locals`, calls service, sends JSON
6. `<feature>.routes.ts`: wire it up, then mount it in `app.ts`
7. A test in `backend/tests/`
8. Frontend: `src/api/<feature>.ts`, a lazy page in `App.tsx`
