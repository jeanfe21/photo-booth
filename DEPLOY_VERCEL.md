# 🚀 Deploy Photo Booth ke Vercel

## ⚡ Quick Deploy

### Option 1: Via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to: https://vercel.com/new
   - Connect GitHub account
   - Select repository: `jeanfe21/photo-booth`
   - Click "Import"

2. **Configure Environment Variables**
   
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_XR2xsUSFot7M@ep-wandering-mud-a4zqjztp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   NEXTAUTH_SECRET=TNpLGYDwtGpulG2rEZ1hX0WpZnzl8HN76W1Yj7PVJN0=
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - ✅ Done!

---

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up project? Yes
# - Link to existing project? No
# - Project name? photo-booth
# - Directory? ./
# - Override settings? No

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

---

## 🔧 Configuration Files

### vercel.json
```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### package.json
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

**The `postinstall` script automatically runs `prisma generate` after npm install.**

---

## 📋 Required Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random 32+ char string | NextAuth secret key |
| `NEXTAUTH_URL` | `https://yourdomain.vercel.app` | Your production URL |

---

## 🔑 Generate NEXTAUTH_SECRET

```bash
# Generate secure random secret
openssl rand -base64 32

# Or use this:
# TNpLGYDwtGpulG2rEZ1hX0WpZnzl8HN76W1Yj7PVJN0=
```

---

## ⚙️ Vercel Project Settings

### Build & Development Settings

1. Go to: Project Settings → General
2. Framework Preset: **Next.js**
3. Build Command: `npm run build`
4. Output Directory: `.next` (default)
5. Install Command: `npm install`
6. Node.js Version: `20.x`

### Environment Variables

1. Go to: Project Settings → Environment Variables
2. Add all required variables (see above)
3. Apply to: Production, Preview, Development

---

## 🐛 Common Build Errors & Fixes

### Error: Prisma Client not generated

**Cause:** Prisma Client not generated during build.

**Fix:** Add `postinstall` script to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Error: Cannot find module '@prisma/client'

**Cause:** Missing Prisma dependency or generation.

**Fix:** 
1. Ensure `@prisma/client` is in `dependencies` (not `devDependencies`)
2. Ensure `postinstall` script runs

### Error: DATABASE_URL not found

**Cause:** Environment variable not set in Vercel.

**Fix:**
1. Go to Project Settings → Environment Variables
2. Add `DATABASE_URL` with your Neon connection string
3. Redeploy

### Error: NEXTAUTH_SECRET not found

**Cause:** Missing NextAuth secret.

**Fix:**
1. Generate secret: `openssl rand -base64 32`
2. Add to Vercel environment variables
3. Redeploy

### Error: ENOENT: no such file or directory 'tsconfig.json'

**Cause:** Missing TypeScript config.

**Fix:** This shouldn't happen. Ensure `tsconfig.json` is committed to Git.

### Error: Build timeout

**Cause:** Build taking too long.

**Fix:**
1. Check for large dependencies
2. Optimize images
3. Use Vercel Pro for longer build times

---

## 🔗 After Deployment

### 1. Setup Custom Domain (Optional)

1. Go to: Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 2. Update Environment Variables

After adding custom domain, update `NEXTAUTH_URL`:
```
NEXTAUTH_URL=https://yourdomain.com
```

### 3. Create Admin User

```bash
# Via Vercel CLI
vercel exec -- npm run create-admin

# Or run locally pointing to production DB
npm run create-admin
```

---

## 🔍 Verify Deployment

### Check Build Logs

1. Go to: Deployments → [Latest Deployment] → Build Logs
2. Ensure all steps completed successfully:
   - ✅ Installing dependencies
   - ✅ Running "postinstall" script (prisma generate)
   - ✅ Building Next.js app
   - ✅ Generating static pages

### Test URLs

- Home: `https://your-domain.vercel.app/`
- Payment: `https://your-domain.vercel.app/booth/pay`
- Admin Login: `https://your-domain.vercel.app/admin/login`
- API: `https://your-domain.vercel.app/api/vouchers`

### Check Runtime Logs

1. Go to: Deployments → [Latest Deployment] → Runtime Logs
2. Check for any runtime errors

---

## 🔄 Redeploy After Changes

### Via GitHub

```bash
# Make changes locally
git add .
git commit -m "fix: update something"
git push origin main

# Vercel automatically deploys on push to main
```

### Via CLI

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to: Project → Analytics
2. Enable Web Analytics
3. View real-time metrics

### Logs & Errors

1. Go to: Project → Logs
2. View function logs
3. Check for errors in Real-time

---

## 🚀 Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Build completes successfully
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)
- [ ] Admin user created
- [ ] Test all routes
- [ ] Test admin dashboard
- [ ] Test voucher system
- [ ] Analytics enabled
- [ ] Monitoring setup

---

## 🆘 Troubleshooting

### Build fails every time

```bash
# Try building locally first
npm install
npm run build

# Check for errors
# Fix locally before pushing
```

### Database connection issues

1. Check `DATABASE_URL` format
2. Ensure Neon DB is accessible
3. Check IP whitelist in Neon dashboard

### NextAuth not working

1. Check `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches domain
3. Clear cache and redeploy

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Project Issues: GitHub Issues

---

**✅ Ready to deploy?** Import your repo to Vercel now!

