# 📦 Deployment Guides

## Quick Links

- 🚀 **Fast Deploy**: [QUICK_START_VPS.md](QUICK_START_VPS.md) - Deploy dalam 10 menit
- 📚 **Full Guide**: [DEPLOY_VPS.md](DEPLOY_VPS.md) - Panduan lengkap dengan troubleshooting
- 🔧 **Docker Guide**: Ada di DEPLOY_VPS.md (Opsi 2)

---

## 🎯 Pilih Method Deploy

### 1. Standard VPS (Recommended for Production)
✅ Stable  
✅ Full control  
✅ Easy maintenance  

**Guide:** [QUICK_START_VPS.md](QUICK_START_VPS.md) - Option A atau B

### 2. Docker
✅ Containerized  
✅ Easy scaling  
✅ Environment consistency  

**Guide:** [DEPLOY_VPS.md](DEPLOY_VPS.md) - Opsi 2

---

## 📋 Checklist Before Deploy

- [ ] Domain sudah pointing ke IP VPS
- [ ] SSH access ke VPS
- [ ] Root atau sudo access
- [ ] DATABASE_URL dari Neon PostgreSQL siap
- [ ] NEXTAUTH_SECRET sudah generate
- [ ] Domain name sudah disiapkan

---

## 🔑 Important Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://yourdomain.com"

# Production
NODE_ENV="production"
```

---

## 🛠️ Generate NEXTAUTH_SECRET

```bash
# Generate new secret
openssl rand -base64 32

# Atau use online
# https://generate-secret.vercel.app/32
```

---

## 📞 Support Files

- `deploy.sh` - Automated deployment script
- `ecosystem.config.cjs` - PM2 configuration
- `nginx.conf.example` - Nginx reverse proxy template

---

## 🔗 Useful Commands

```bash
# Check app status
pm2 status

# View logs
pm2 logs photo-booth

# Restart app
pm2 restart photo-booth

# Update code
cd /var/www/photo-booth
git pull origin main
npm install
npm run build
pm2 restart photo-booth

# Check Nginx
sudo nginx -t
sudo systemctl restart nginx

# Renew SSL
sudo certbot renew
```

---

## 🆘 Common Issues

### Port 3000 sudah dipakai
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Permission denied
```bash
sudo chown -R $USER:$USER /var/www/photo-booth
```

### SSL certificate error
```bash
sudo certbot --nginx -d yourdomain.com --force-renewal
```

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Reverse Proxy](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
- [Let's Encrypt](https://letsencrypt.org/docs/)

---

**Ready to deploy?** → [QUICK_START_VPS.md](QUICK_START_VPS.md)

