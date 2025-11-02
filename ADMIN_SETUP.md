# Admin Setup Guide

## Setup Awal

### 1. Buat Admin User

Jalankan script untuk membuat admin user pertama:

```bash
DATABASE_URL="postgresql://neondb_owner:npg_XR2xsUSFot7M@ep-wandering-mud-a4zqjztp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" ADMIN_USERNAME=admin ADMIN_PASSWORD=admin123 npm run create-admin
```

Atau buat file `.env` dengan:
```
DATABASE_URL="postgresql://neondb_owner:npg_XR2xsUSFot7M@ep-wandering-mud-a4zqjztp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="your-secret-key-here"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Lalu jalankan:
```bash
npm run create-admin
```

### 2. Akses Halaman Admin

1. Login: http://localhost:3000/admin/login
   - Username: `admin` (atau yang Anda set)
   - Password: `admin123` (atau yang Anda set)

2. Dashboard: http://localhost:3000/admin
   - Buat voucher baru
   - Lihat daftar semua voucher
   - Toggle status voucher (active/inactive)
   - Hapus voucher

## Fitur

### Admin Dashboard
- ✅ Create voucher dengan status aktif/inaktif
- ✅ List semua voucher dengan detail
- ✅ Toggle status voucher (active ↔ inactive)
- ✅ Delete voucher
- ✅ Lihat kapan voucher digunakan

### Voucher Validation
- ✅ Validasi voucher melalui database saat user input
- ✅ Check status active/inactive
- ✅ Check apakah sudah digunakan
- ✅ Auto mark sebagai used setelah validasi berhasil

## API Routes

- `GET /api/vouchers` - List semua voucher (admin only)
- `POST /api/vouchers` - Create voucher baru (admin only)
- `PATCH /api/vouchers/[id]` - Update voucher (admin only)
- `DELETE /api/vouchers/[id]` - Delete voucher (admin only)
- `POST /api/vouchers/verify` - Verify voucher untuk payment (public)

## Database Schema

### Admin
- `id` - String (cuid)
- `username` - String (unique)
- `password` - String (hashed)
- `createdAt` - DateTime
- `updatedAt` - DateTime

### Voucher
- `id` - String (cuid)
- `code` - String (unique, uppercase)
- `status` - String ("active" | "inactive")
- `createdAt` - DateTime
- `updatedAt` - DateTime
- `usedAt` - DateTime? (nullable)

## Security

- ✅ Password di-hash dengan bcrypt
- ✅ JWT authentication dengan NextAuth
- ✅ Protected routes dengan middleware
- ✅ API routes protected dengan auth check

