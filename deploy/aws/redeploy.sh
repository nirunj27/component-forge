#!/usr/bin/env bash
# Redeploy after git pull on EC2
set -euo pipefail

cd /opt/component-forge
git pull origin main
bash deploy/aws/build-production.sh
pm2 restart forge-api
sudo nginx -t && sudo systemctl reload nginx
echo "Redeploy complete."
