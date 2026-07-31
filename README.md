# DT Trucks — Next.js rebuild

Authorised Isuzu dealer site for dttrucks.com. Next.js 16, PostgreSQL, Prisma, Auth.js admin CMS.

## Requirements

- Node.js **20.9+** (recommended: use `.nvmrc` → `nvm use`)
- Docker (local PostgreSQL)
- npm

## Quick start

```bash
nvm use
cp .env.example .env.local   # already created if you cloned with secrets
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

- Public site: http://localhost:3000
- Admin CMS: http://localhost:3000/admin/login
- Prisma Studio: `npm run db:studio`

Default seed admin: `admin@dttrucks.com` / `changeme` (see `SEED_*` in `.env.local`).

## PostgreSQL

Docker Compose runs Postgres on **localhost:5435** (avoids conflicts with other local Postgres instances).

```bash
docker compose up -d
docker compose down
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:seed` | Seed from `structure.md` content |
| `npm run db:studio` | Prisma Studio GUI |
| `npm run db:generate` | Regenerate Prisma client |

## Project docs

- `plan.md` — phased rebuild plan
- `structure.md` — current site content audit
- `design-prompt.md` — homepage design brief
- `prototype/` — approved HTML prototype

## Environment

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

Media uploads in development are stored in `public/uploads/` (gitignored). Configure `S3_*` variables for production object storage.
