## Quick orientation — Project Management (PERN) app

This repository is a small PERN-style monorepo with two workspaces: `backend` (Express + Postgres) and `frontend` (Vite + React). The goal of this file is to give an AI coding agent the exact, actionable facts it needs to be productive in the codebase.

Key facts (big picture)
- Root uses Yarn/NPM workspaces (see top-level `package.json` `workspaces` array).
- Backend: `backend/` — Express server, CommonJS modules, PostgreSQL access via `pg`.
- Frontend: `frontend/` — Vite + React (ESM). The frontend intentionally uses modern ESM syntax.
- Dev runner: root `npm run dev` uses `concurrently` to start both workspaces.

How to run locally (commands)
- Start backend only:
  - cd backend && npm run dev   # uses nodemon
  - cd backend && npm start     # production style (node server.js)
- Start frontend only:
  - cd frontend && npm run dev  # Vite dev server
- From repo root run both in parallel:
  - npm run dev

Important files and conventions (use these as anchors when making edits)
- `backend/server.js` — main Express server. Registers routes and auth middleware. Typical pattern: `const usersRouter = require('./src/routes/users')`.
- `backend/src/db/connection.js` — exports `{ query, pool }` (wrapper over `pg.Pool`). Always use `require('../db/connection')` and call `db.query(text, params)`.
- `backend/src/db/dbSetup.js` — contains SQL used to create tables. This file uses raw SQL via `db.query(...)`. Note: Postgres dialect, avoid MySQL-specific syntax (example: no `CREATE DATABASE IF NOT EXISTS`).
- `backend/src/routes/*.js` — express route handlers that use models and `db.query` directly.
- `backend/src/models/*Model.js` — small model wrappers; they call `db.query` directly rather than using an ORM.
- `backend/src/middleware/auth.js` — JWT-based auth middleware. Routes are registered under `/api/*` and protected by the middleware except `/api/auth`.

Project-specific patterns and gotchas (concrete)
- Module system: Backend is CommonJS. Files use `require()` and `module.exports` — keep this consistent. If tests or CI run with ESM, check `backend/package.json` for a `"type"` field (we set it to `commonjs`).
- DB access: raw SQL strings embedded in JS. Statements must be valid PostgreSQL. Example: table creation in `dbSetup.js` uses `serial`, `character varying(50)`, `integer[]` and a custom `priority` type (the project expects you to add or manage that type elsewhere).
- DB connection: environment variable `POSTGRES_DATABASE_URL` is used. When connecting to hosted Postgres that requires TLS, connection code in `backend/src/db/connection.js` sets `ssl: { rejectUnauthorized: false }` — that's how TLS is tolerated in dev. Prefer `?sslmode=require` in the connection string or proper certs in prod.
- Server startup: `server.js` wraps `app.listen(port, ...)`. If you don't see startup logs, ensure `PORT` is set in `backend/.env` and the process isn't stuck awaiting an `await` at top-level (CommonJS cannot use top-level await unless configured for ESM).

Debugging tips and past pitfalls (concrete examples found here)
- "require is not defined": caused when a file uses `import`/`export` but Node treats it as CommonJS (or vice-versa). Search for files that mix `import` and `require` (eg. earlier `dbSetup.js` and `server.js` were inconsistent). Fix by choosing CommonJS for backend or converting everything to ESM and updating `backend/package.json` `type`.
- SQL syntax errors: watch for MySQL vs Postgres differences. Example: `CREATE DATABASE IF NOT EXISTS` is invalid in Postgres — causes a syntax error at the `NOT` token. Use a separate DB creation flow or handle Postgres error code `42P04` when programmatically creating DBs.
- SSL/TLS errors connecting to Postgres: add `ssl` config to `new Pool({ ... ssl: { rejectUnauthorized: false } })` for hosted DBs that require TLS, or append `?sslmode=require` to the connection string.

What to change vs what not to change
- Don't change the `priority` type in `dbSetup.js` unless you also add the SQL that creates a corresponding Postgres enum/type. The repo intentionally references it and expects app code to be updated later.
- Prefer fixing module-system mismatches via `backend/package.json` (`"type": "commonjs"`) rather than individually converting many files unless you intentionally migrate to ESM.

Where to look for integrations and external dependencies
- Postgres: `backend/src/db/connection.js`, env `POSTGRES_DATABASE_URL`, and `backend/docker/compose.yaml` (DB service definitions).
- JWT: `jsonwebtoken` used in `backend/src/routes/auth.js` and `backend/src/middleware/auth.js` — tokens expected in Authorization header.
- Frontend → Backend: frontend calls REST endpoints under `/api/*` (see `frontend/src/*` for axios usage).

Developer workflows / notes for PRs
- There are no automated tests in the repo. Validate changes manually by running `npm run dev` at root and exercising the API and UI.
- Use `nodemon` for backend during development (`npm run dev` inside `backend`).

If you need to make a migration or DB change
- Edit `backend/src/db/dbSetup.js` for initial table definitions. Keep SQL strictly Postgres-compatible.
- For a programmatic create-if-needed flow, connect to the default `postgres` DB separately then run `CREATE DATABASE ...` and ignore SQLSTATE `42P04` if the DB already exists.

If anything here is unclear or you want the file to include extra sections (example: coding style specifics, sample API shape, or list of TODOs in the code), point me to the files you want emphasized and I'll iterate.
