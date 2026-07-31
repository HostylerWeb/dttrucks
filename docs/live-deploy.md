# Deploying updates to the live website

How to publish changes from GitHub to the production VPS.

## Overview

| Item | Value |
|------|--------|
| GitHub repo | https://github.com/HostylerWeb/dttrucks |
| Branch | `main` |
| Live site | https://srv1869968.hstgr.cloud |
| App path on server | `/var/www/dttrucks` |
| Process manager | PM2 (`dttrucks`) |
| Web server | nginx → Next.js on port 3000 |

### VPS SSH (for deploy from dev machine / Cursor)

| Item | Value |
|------|--------|
| Host | `2.24.141.130` |
| User | `root` |
| Password | `Curtisisgreat123@` |

**Security:** change the root password and prefer SSH keys in production. This password is documented here so deploys can be run from Cursor without interactive login. Do not share this file publicly.

Requires `sshpass` on your dev machine (`sudo apt install sshpass` on Linux).

Production secrets (`.env`, database password) live **only on the server**. They are not in GitHub.

---

## Standard workflow

### 1. Push changes to GitHub (dev machine)

```bash
cd /var/www/dttrucks   # or your local project path

git add -A
git commit -m "Describe your change"
git push origin main
```

### 2. Deploy on the VPS

SSH into the server, then run the deploy script:

```bash
ssh root@2.24.141.130

cd /var/www/dttrucks
./scripts/deploy.sh
```

That script:

1. Fetches and resets to `origin/main` (latest GitHub `main`)
2. Runs `npm ci`
3. Runs `npx prisma generate` and `npx prisma migrate deploy`
4. Runs `npm run build`
5. Restarts the app with PM2

When it finishes, check https://srv1869968.hstgr.cloud/

### 3. Deploy from dev machine without interactive SSH (sshpass)

After pushing to `main`, run this from your dev machine (or ask Cursor to run it):

```bash
sshpass -p 'Curtisisgreat123@' ssh -o StrictHostKeyChecking=no root@2.24.141.130 \
  'cd /var/www/dttrucks && ./scripts/deploy.sh'
```

Verify the server picked up the latest commit:

```bash
sshpass -p 'Curtisisgreat123@' ssh -o StrictHostKeyChecking=no root@2.24.141.130 \
  'cd /var/www/dttrucks && git rev-parse --short HEAD && pm2 status dttrucks'
```

---

## Quick checks after deploy

```bash
pm2 status
pm2 logs dttrucks --lines 50
curl -I https://srv1869968.hstgr.cloud/
```

Admin login: https://srv1869968.hstgr.cloud/admin/login

---

## Manual deploy (if the script fails)

```bash
cd /var/www/dttrucks

git fetch origin main
git reset --hard origin/main

export NODE_OPTIONS="--max-old-space-size=3072"
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build

pm2 restart ecosystem.config.cjs
pm2 save
```

---

## Important notes

- **Never commit `.env`** — server config stays in `/var/www/dttrucks/.env` only.
- **Do not copy `.env.local`** to the server (it points at local Docker Postgres on port 5435).
- **Database password** on the server: `/root/.dttrucks_db_pass` (if you need to rebuild `DATABASE_URL`).
- **New migrations** are applied automatically by `deploy.sh` via `prisma migrate deploy`.
- **Seed data** is not re-run on deploy; use `npm run db:seed` manually only when you intend to reset/refresh seed content.
- **SSL** renews automatically via Certbot (`certbot.timer`).

---

## When `dttrucks.com` is pointed here

1. Point DNS A record to `2.24.141.130`.
2. Add SSL: `certbot --nginx -d dttrucks.com -d www.dttrucks.com`
3. Update `/var/www/dttrucks/.env`:
   - `NEXT_PUBLIC_SITE_URL="https://dttrucks.com"`
   - `AUTH_URL="https://dttrucks.com"`
4. Rebuild and restart: `npm run build && pm2 restart dttrucks`

---

## Troubleshooting

| Problem | What to check |
|---------|----------------|
| Site down after deploy | `pm2 logs dttrucks` |
| Database errors | `docker` is **not** used on VPS; Postgres runs locally on port 5432. Check `DATABASE_URL` in `.env`. |
| Build fails (out of memory) | `export NODE_OPTIONS="--max-old-space-size=3072"` before build |
| HTTPS timeout | nginx/Certbot: `systemctl status nginx`, `certbot certificates` |
| Old code still showing | Confirm deploy finished; hard-refresh browser or check `git rev-parse HEAD` matches GitHub `main` |

---

## Ask Cursor to deploy

After pushing to `main`, you can say: **“Update the live website from GitHub”** — Cursor should run the `sshpass` deploy command in section 3 above (or SSH in and run `./scripts/deploy.sh`).
