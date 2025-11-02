# 🚀 Quick Start: Deploy ke VPS dalam 10 Menit

## Prasyarat
✅ Domain sudah pointing ke IP VPS  
✅ SSH access ke VPS  
✅ Root atau sudo access  

---

## Option A: Otomatis dengan Script (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/jeanfe21/photo-booth.git /var/www/photo-booth
cd /var/www/photo-booth

# 2. Run deployment script
chmod +x deploy.sh
sudo ./deploy.sh

# 3. Configure environment
nano .env
# Update: NEXTAUTH_URL="https://yourdomain.com"

# 4. Configure Nginx
sudo nano /etc/nginx/sites-available/photo-booth
# Copy content from nginx.conf.example and update domain

# 5. Enable site
sudo ln -s /etc/nginx/sites-available/photo-booth /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 6. Setup SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# ✅ DONE! Visit https://yourdomain.com
```

---

## Option B: Manual Setup

### 1️⃣ Setup Server

```bash
# Update & Install
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2️⃣ Deploy App

```bash
# Clone repo
sudo mkdir -p /var/www/photo-booth
sudo chown $USER:$USER /var/www/photo-booth
cd /var/www/photo-booth
git clone https://github.com/jeanfe21/photo-booth.git .

# Install dependencies
npm install

# Generate Prisma
npm run prisma:generate

# Build
npm run build

# Create admin user
npm run create-admin
```

### 3️⃣ Configure Environment

```bash
cp .env.example .env
nano .env
```

**Update:**
```env
NEXTAUTH_URL="https://yourdomain.com"
DATABASE_URL="postgresql://neondb_owner:npg_XR2xsUSFot7M@ep-wandering-mud-a4zqjztp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="TNpLGYDwtGpulG2rEZ1hX0WpZnzl8HN76W1Yj7PVJN0="
```

### 4️⃣ Start with PM2

```bash
# Start app
cd /var/www/photo-booth
pm2 start npm --name "photo-booth" -- start

# Save & auto-start
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

### 5️⃣ Setup Nginx

```bash
# Create config
sudo nano /etc/nginx/sites-available/photo-booth
```

**Paste:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/photo-booth /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

### 6️⃣ Setup SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7️⃣ Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## ✅ Verify

```bash
# Check app
pm2 status
pm2 logs photo-booth

# Test domain
curl https://yourdomain.com

# Test admin
curl https://yourdomain.com/admin/login
```

---

## 🔧 Useful Commands

```bash
# Restart app
pm2 restart photo-booth

# View logs
pm2 logs photo-booth

# Update code
cd /var/www/photo-booth
git pull origin main
npm install
npm run build
pm2 restart photo-booth

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
```

---

## 🆘 Troubleshooting

### App tidak jalan
```bash
pm2 logs photo-booth --lines 50
```

### Nginx error
```bash
sudo tail -f /var/log/nginx/error.log
sudo nginx -t
```

### Port 3000 tidak accessible
```bash
sudo netstat -tulpn | grep 3000
```

### Database connection error
```bash
# Check .env
cat .env | grep DATABASE_URL
```

---

## 📞 Next Steps

1. ✅ Visit https://yourdomain.com
2. ✅ Login admin: https://yourdomain.com/admin/login
3. ✅ Create vouchers
4. ✅ Test payment flow
5. ✅ Setup monitoring (optional)

**🎉 Done!**

