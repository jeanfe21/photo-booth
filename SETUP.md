# Setup Photo Booth Admin System

## Quick Start

### 1. Setup Environment

File `.env` sudah dikonfigurasi dengan DATABASE_URL dari Neon PostgreSQL.

### 2. Create Admin User

Jalankan command berikut untuk membuat admin user pertama:

```bash
npm run create-admin
```

Atau dengan username/password custom:

```bash
ADMIN_USERNAME=your_username ADMIN_PASSWORD=your_password npm run create-admin
```

### 3. Jalankan Development Server

```bash
npm run dev
```

### 4. Akses Admin Panel

1. Login di: http://localhost:3000/admin/login
2. Dashboard: http://localhost:3000/admin

## Features

### Admin Dashboard
- ✅ Create voucher dengan kode custom
- ✅ Set status active/inactive
- ✅ Lihat semua voucher
- ✅ Toggle status voucher
- ✅ Hapus voucher
- ✅ Lihat riwayat penggunaan voucher

### Voucher System
- ✅ Validasi otomatis melalui database
- ✅ Check status active/inactive
- ✅ Check apakah sudah digunakan
- ✅ Auto mark as used setelah validasi sukses
- ✅ Secure authentication dengan NextAuth

## Admin Credentials

Default setelah menjalankan `npm run create-admin`:
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Penting:** Ganti password default di production!

## API Endpoints

### Public
- `POST /api/vouchers/verify` - Verify voucher untuk payment

### Protected (Admin Only)
- `GET /api/vouchers` - List semua voucher
- `POST /api/vouchers` - Create voucher baru
- `PATCH /api/vouchers/[id]` - Update voucher
- `DELETE /api/vouchers/[id]` - Delete voucher

## Database Schema

### Admin
```typescript
{
  id: string (cuid)
  username: string (unique)
  password: string (hashed bcrypt)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Voucher
```typescript
{
  id: string (cuid)
  code: string (unique, uppercase)
  status: "active" | "inactive"
  createdAt: DateTime
  updatedAt: DateTime
  usedAt: DateTime? (nullable)
}
```

## Tech Stack

- **Framework:** Next.js 15
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 6
- **Auth:** NextAuth.js v5
- **UI:** Tailwind CSS + Shadcn/ui
- **Password Hashing:** bcryptjs

## Production Deployment

1. Setup environment variables di production platform (Vercel/etc)
2. Set `DATABASE_URL` ke production database
3. Set `NEXTAUTH_SECRET` untuk security
4. Run `npm run create-admin` untuk membuat admin
5. Ganti password admin
6. Deploy!

