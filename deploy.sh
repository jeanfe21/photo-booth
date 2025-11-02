#!/bin/bash

# Photo Booth Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting Photo Booth deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/photo-booth"
REPO_URL="https://github.com/jeanfe21/photo-booth.git"

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root or with sudo${NC}" 
   exit 1
fi

# Step 1: Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Step 2: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Installing PM2...${NC}"
    npm install -g pm2
fi

# Step 3: Clone or update repository
if [ ! -d "$APP_DIR" ]; then
    echo -e "${YELLOW}📦 Cloning repository...${NC}"
    mkdir -p $APP_DIR
    git clone $REPO_URL $APP_DIR
else
    echo -e "${YELLOW}📦 Updating repository...${NC}"
    cd $APP_DIR
    git pull origin main
fi

# Step 4: Install project dependencies
echo -e "${YELLOW}📦 Installing project dependencies...${NC}"
cd $APP_DIR
npm install

# Step 5: Generate Prisma client
echo -e "${YELLOW}📦 Generating Prisma client...${NC}"
npm run prisma:generate || echo -e "${RED}Prisma generate failed, continuing...${NC}"

# Step 6: Check for .env file
if [ ! -f "$APP_DIR/.env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from example...${NC}"
    if [ -f "$APP_DIR/.env.example" ]; then
        cp $APP_DIR/.env.example $APP_DIR/.env
        echo -e "${RED}❗ Please edit .env file with your configuration!${NC}"
        exit 1
    else
        echo -e "${RED}❌ .env.example not found!${NC}"
        exit 1
    fi
fi

# Step 7: Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Step 8: Setup PM2
echo -e "${YELLOW}⚙️  Setting up PM2...${NC}"
cd $APP_DIR
pm2 delete photo-booth 2>/dev/null || true
pm2 start ecosystem.config.cjs || pm2 start npm --name "photo-booth" -- start
pm2 save

# Step 9: Configure Nginx
echo -e "${YELLOW}⚙️  Configuring Nginx...${NC}"
if [ -f "$APP_DIR/nginx.conf.example" ]; then
    echo -e "${YELLOW}Please update nginx.conf.example with your domain and copy to /etc/nginx/sites-available/photo-booth${NC}"
    echo -e "${YELLOW}Or create nginx config manually${NC}"
fi

# Step 10: Setup Firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw allow OpenSSH 2>/dev/null || true
ufw allow 'Nginx Full' 2>/dev/null || true
ufw --force enable 2>/dev/null || true

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "  1. Edit $APP_DIR/.env with your configuration"
echo -e "  2. Configure Nginx: /etc/nginx/sites-available/photo-booth"
echo -e "  3. Setup SSL: certbot --nginx -d yourdomain.com"
echo -e "  4. Visit: https://yourdomain.com"
echo ""
echo -e "${GREEN}Check status: pm2 status${NC}"
echo -e "${GREEN}View logs: pm2 logs photo-booth${NC}"

