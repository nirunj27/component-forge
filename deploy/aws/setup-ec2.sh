#!/usr/bin/env bash
# First-time EC2 setup for Component Forge (Ubuntu 22.04/24.04)
# Run as ubuntu user: bash deploy/aws/setup-ec2.sh
set -euo pipefail

APP_DIR="/opt/component-forge"
REPO_URL="${REPO_URL:-https://github.com/nirunj27/component-forge.git}"
JWT_SECRET="${JWT_SECRET:-$(openssl rand -hex 32)}"

if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo: sudo bash deploy/aws/setup-ec2.sh"
  exit 1
fi

echo "==> Installing system packages..."
apt-get update -qq
apt-get install -y -qq curl git nginx

echo "==> Installing Node.js 20..."
if ! command -v node &>/dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi

echo "==> Installing PM2..."
npm install -g pm2

echo "==> Cloning repository..."
if [[ ! -d $APP_DIR/.git ]]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  echo "    Repo exists at $APP_DIR — pull latest with: cd $APP_DIR && git pull"
fi
chown -R ubuntu:ubuntu "$APP_DIR"

echo "==> Building application (as ubuntu)..."
sudo -u ubuntu bash -c "cd $APP_DIR && bash deploy/aws/build-production.sh"

echo "==> Configuring Nginx..."
cp "$APP_DIR/deploy/aws/nginx/component-forge.conf" /etc/nginx/sites-available/component-forge
ln -sf /etc/nginx/sites-available/component-forge /etc/nginx/sites-enabled/component-forge
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

echo "==> Starting API with PM2 (ubuntu user)..."
sudo -u ubuntu bash <<EOF
set -e
cd $APP_DIR
export JWT_SECRET="$JWT_SECRET"
export NODE_ENV=production
export PORT=3001
pm2 delete forge-api 2>/dev/null || true
pm2 start deploy/aws/ecosystem.config.cjs --update-env
pm2 save
EOF

echo "==> PM2 startup on boot..."
sudo env PATH="$PATH" pm2 startup systemd -u ubuntu --hp /home/ubuntu | tail -1 | bash || true
sudo -u ubuntu pm2 save

echo ""
echo "=============================================="
echo "  Component Forge is deployed!"
echo "=============================================="
echo "  Playground: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo YOUR_EC2_IP)/"
echo "  Studio:     http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo YOUR_EC2_IP)/studio/"
echo "  API:        http://.../api/registry/components"
echo ""
echo "  JWT_SECRET saved in PM2 env — set in ecosystem.config.cjs or:"
echo "  pm2 restart forge-api --update-env"
echo "=============================================="
