#!/usr/bin/env bash
# Deploy latest main branch on the production VPS.
# Usage (on server): ./scripts/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Pulling latest from GitHub..."
git fetch origin main
git reset --hard origin/main

echo "==> Installing dependencies..."
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=3072}"
npm ci

echo "==> Prisma generate + migrations..."
npx prisma generate
npx prisma migrate deploy

echo "==> Building Next.js..."
npm run build

echo "==> Restarting app..."
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs
  pm2 save
else
  echo "PM2 not found — start manually: npm run start"
fi

echo "==> Deploy complete."
