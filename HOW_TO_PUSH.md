# Cara Push ke GitHub

## 🎯 Quick Push (Pilih salah satu)

### Cara 1: GitHub CLI (Termudah) ⭐

Jika sudah install GitHub CLI:

```bash
cd /Users/namea/Documents/cursor/photo-booth
gh auth login
git push -u origin main
```

### Cara 2: Personal Access Token

1. **Buat Token Baru:**
   - Buka: https://github.com/settings/tokens
   - Klik "Generate new token (classic)"
   - Name: `photo-booth`
   - Scopes: ✅ `repo` (expand dan centang semua)
   - Klik "Generate token"
   - **COPY TOKEN** (hanya muncul sekali!)

2. **Push dengan Token:**
```bash
cd /Users/namea/Documents/cursor/photo-booth

# Masukkan TOKEN yg baru kamu copy di baris ini:
git push https://<TOKEN_HERE>@github.com/jeanfe21/photo-booth.git main

# Contoh:
# git push https://ghp_abc123xyz@github.com/jeanfe21/photo-booth.git main
```

### Cara 3: Manual Credential Prompt

```bash
cd /Users/namea/Documents/cursor/photo-booth
git push -u origin main

# Saat ditanya:
# Username: jeanfe21
# Password: <masukkan Personal Access Token>
```

### Cara 4: Setup SSH (Untuk Kedepannya)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "jean@nexalab.io"
# Tekan Enter untuk semua prompt

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Pasang ke GitHub:
# 1. Buka: https://github.com/settings/keys
# 2. New SSH key
# 3. Paste public key
# 4. Save

# Update remote
git remote set-url origin git@github.com:jeanfe21/photo-booth.git

# Push
git push -u origin main
```

## ✅ Yang Akan Di-Push

```
📦 Commits ready to push:
  1. Initial commit from Create Next App
  2. Complete photo booth application
  3. Desktop app integration fix

📁 Files (43 total):
  ✅ Full Next.js app with modern UI
  ✅ Voucher system with database
  ✅ Admin dashboard
  ✅ Deep link integration
  ✅ Documentation
```

## 🔒 Security Note

⚠️ **JANGAN** commit file berikut ke GitHub:
- `.env` (sudah di .gitignore) ✅
- `lib/generated/prisma` (sudah di .gitignore) ✅
- Personal Access Tokens ✅
- Node modules ✅

## 📚 Repo akan Berisi

- Source code lengkap
- Database migrations
- Setup instructions
- Desktop app integration docs
- QRIS payment flow
- Voucher management

