# Git Push Instructions

## Current Status

✅ Repository sudah dikonfigurasi dengan remote:
- Remote: `https://github.com/jeanfe21/photo-booth.git`
- Branch: `main`
- Commits ready to push

## Authentication Issue

Current error: `Permission denied to jeffryAnderson183`

This means Git is using wrong credentials.

## Solutions

### Option 1: Use Personal Access Token (Recommended)

1. Generate a new GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (all)
   - Copy the token

2. Push using token:
```bash
git push https://<TOKEN>@github.com/jeanfe21/photo-booth.git main
```

Or update remote URL:
```bash
git remote set-url origin https://<TOKEN>@github.com/jeanfe21/photo-booth.git
git push -u origin main
```

### Option 2: Use SSH

1. Set up SSH key (if not already):
```bash
ssh-keygen -t ed25519 -C "jean@nexalab.io"
```

2. Add SSH key to GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Add to: https://github.com/settings/keys

3. Change remote URL:
```bash
git remote set-url origin git@github.com:jeanfe21/photo-booth.git
git push -u origin main
```

### Option 3: Use GitHub CLI

```bash
# Install gh CLI if not installed
brew install gh

# Login
gh auth login

# Push
git push -u origin main
```

### Option 4: Clear Credentials and Re-authenticate

```bash
# Clear stored credentials
git credential-osxkeychain erase
host=github.com
protocol=https

# Push again (it will prompt for credentials)
git push -u origin main
```

## What's Already Done

- ✅ Remote configured
- ✅ All changes committed
- ✅ Commit message ready
- ⚠️ Just need to authenticate and push

## Commit Summary

```
feat: Complete photo booth application with voucher system, admin panel, and desktop app integration

- Modern UI with dark theme and gradient animations
- Voucher system with PostgreSQL database and Prisma ORM
- Admin dashboard for voucher management
- NextAuth authentication with secure password hashing
- Deep link integration for desktop app (photobooth:// protocol)
- Payment options: QRIS and Cash with voucher validation
- Fully responsive design with glassmorphism effects
- Comprehensive documentation and setup guides
```

## Quick Commands

```bash
# Check current remote
git remote -v

# Try pushing again
git push -u origin main

# Or check what commits need to be pushed
git log origin/main..main
```

