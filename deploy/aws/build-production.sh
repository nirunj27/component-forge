#!/usr/bin/env bash
# Build all apps for AWS (run on EC2 after git pull)
set -euo pipefail

cd /opt/component-forge

echo "==> Installing dependencies..."
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install --frozen-lockfile

echo "==> Building packages, API, and frontends..."
export VITE_BASE_PATH=/studio/
# Same-origin API via nginx — leave VITE_API_URL unset
unset VITE_API_URL || true

pnpm run build:aws

echo "==> Build complete."
echo "    Playground: apps/playground/dist"
echo "    Studio:     apps/studio/dist"
echo "    API:        apps/api/dist"
