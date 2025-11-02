# Deploy Photo Booth ke VPS

## 📋 Prasyarat

- VPS dengan Ubuntu 22.04 LTS atau lebih baru
- Domain sudah pointing ke IP VPS
- SSH access ke VPS
- Root atau sudo access

---

## 🚀 Opsi 1: Deploy Standar dengan PM2

### 1. Setup VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Reverse Proxy)
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### 2. Clone Repository

```bash
# Buat folder untuk aplikasi
sudo mkdir -p /var/www/photo-booth
sudo chown $USER:$USER /var/www/photo-booth

# Clone repo
cd /var/www/photo-booth
git clone https://github.com/jeanfe21/photo-booth.git .

# Atau jika sudah punya kode:
# git pull origin main
```

### 3. Install Dependencies

```bash
cd /var/www/photo-booth

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate
```

### 4. Konfigurasi Environment

```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan nano atau vim
nano .env
```

**Update `.env` untuk production:**
```env
DATABASE_URL="postgresql://neondb_owner:npg_XR2xsUSFot7M@ep-wandering-mud-a4zqjztp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="TNpLGYDwtGpulG2rEZ1hX0WpZnzl8HN76W1Yj7PVJN0="
NEXTAUTH_URL="https://yourdomain.com"

# Production URLs
NODE_ENV="production"
PORT=3000
```

### 5. Build Application

```bash
# Build production app
npm run build

# Create admin user (jika belum)
npm run create-admin
```

### 6. Setup PM2

```bash
# Start app dengan PM2
pm2 start npm --name "photo-booth" -- start

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
# Jalankan command yang dioutput oleh pm2 startup
```

### 7. Konfigurasi Nginx

```bash
# Buat file konfigurasi Nginx
sudo nano /etc/nginx/sites-available/photo-booth
```

**Isi dengan:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificates (akan di-generate oleh Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. Enable Nginx Site

```bash
# Aktifkan site
sudo ln -s /etc/nginx/sites-available/photo-booth /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 9. Install SSL Certificate dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 10. Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🚀 Opsi 2: Deploy dengan Docker

### 1. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
# Logout dan login lagi setelah ini
```

### 2. Create Dockerfile

```bash
# Create Dockerfile di root project
nano Dockerfile
```

**Isi dengan:**
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 3. Update next.config.ts

```bash
nano next.config.ts
```

**Tambahkan `output: 'standalone'`:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Tambahkan ini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

### 4. Create docker-compose.yml

```bash
nano docker-compose.yml
```

**Isi dengan:**
```yaml
version: '3.8'

services:
  photo-booth:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NODE_ENV=production
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 5. Deploy dengan Docker

```bash
# Build dan run
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔧 Maintenance Commands

### PM2 Commands
```bash
pm2 status
pm2 logs photo-booth
pm2 restart photo-booth
pm2 stop photo-booth
pm2 delete photo-booth
```

### Nginx Commands
```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
```

### Docker Commands
```bash
docker-compose logs -f photo-booth
docker-compose restart photo-booth
docker-compose down
docker-compose up -d
```

---

## 🐛 Troubleshooting

### App tidak bisa diakses
```bash
# Check PM2
pm2 status

# Check Nginx
sudo nginx -t

# Check port 3000
sudo netstat -tulpn | grep 3000

# Check logs
pm2 logs photo-booth
sudo tail -f /var/log/nginx/error.log
```

### Database connection error
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Check environment variables
pm2 env photo-booth | grep DATABASE_URL
```

### SSL certificate expired
```bash
# Renew certificate
sudo certbot renew

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📝 Checklist Deploy

- [ ] VPS setup selesai
- [ ] Domain pointing ke IP VPS
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Build successful
- [ ] PM2/Docker running
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Admin user created
- [ ] Test aplikasi di browser

---

## 🔗 URLs Setelah Deploy

- **Home:** https://yourdomain.com
- **Payment:** https://yourdomain.com/booth/pay
- **Admin Login:** https://yourdomain.com/admin/login
- **Admin Dashboard:** https://yourdomain.com/admin

---

## 📞 Support

Jika ada masalah, check:
1. PM2 logs: `pm2 logs photo-booth`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Application logs di VPS

