# Fix Git Push Authentication

## Problem
Git menggunakan kredensial lama (`jeffryAnderson183`) untuk GitHub.

## Solution: Clear Old Credentials

### Step 1: Clear Keychain
```bash
# Clear all GitHub credentials from macOS Keychain
security delete-internet-password -s github.com
```

### Step 2: Try Push Again
```bash
cd /Users/namea/Documents/cursor/photo-booth
git push -u origin main
```

Saat diminta credentials:
- Username: `jeanfe21`
- Password: **[Personal Access Token - bukan password]**

### Step 3: Get New Token
Jika belum punya token:
1. Buka: https://github.com/settings/tokens
2. "Generate new token" → "classic"
3. Check: `repo` (all permissions)
4. Generate & Copy token

## Alternative: Use Token Directly

```bash
# Set remote with token (temporary)
git remote set-url origin https://[YOUR_NEW_TOKEN]@github.com/jeanfe21/photo-booth.git

# Push
git push -u origin main

# Reset back to normal URL
git remote set-url origin https://github.com/jeanfe21/photo-booth.git
```

## Current Status

✅ Repository: Configured
✅ Commits: 4 commits ready
❌ Authentication: Wrong credentials cached

## Ready to Push

```
2a4b5b1 docs: add detailed push instructions to GitHub
02f4be5 fix: restore web fallback for desktop app integration  
be503d5 feat: Complete photo booth application with voucher system
6bb2b83 Initial commit from Create Next App
```

