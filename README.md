# Photo Booth Application

Aplikasi photo booth modern dengan sistem voucher dan pembayaran QRIS/Tunai.

## 🚀 Features

- ✅ **Modern UI** dengan dark theme & gradient animasi
- ✅ **Payment Options** QRIS & Tunai
- ✅ **Voucher System** dengan database PostgreSQL
- ✅ **Admin Dashboard** untuk manage voucher
- ✅ **Secure Authentication** dengan NextAuth
- ✅ **Responsive Design** mobile-friendly

## 📋 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Environment variable sudah dikonfigurasi di `.env` dengan Neon PostgreSQL.

### 3. Create Admin User

```bash
npm run create-admin
```

Default credentials:
- Username: `admin`
- Password: `admin123`

### 4. Run Development Server

```bash
npm run dev
```

Akses aplikasi di http://localhost:3000

## 🎯 Admin Panel

Login: http://localhost:3000/admin/login

Fitur Admin:
- Create voucher baru
- Set status active/inactive
- Lihat semua voucher
- Toggle status voucher
- Hapus voucher
- Lihat riwayat penggunaan

## 📁 Project Structure

```
photo-booth/
├── app/
│   ├── admin/           # Admin pages (login, dashboard)
│   ├── api/             # API routes (auth, vouchers)
│   ├── booth/           # Booth pages (payment, app)
│   └── page.tsx         # Home page
├── components/
│   ├── admin/           # Admin components
│   ├── booth/           # Booth components
│   └── ui/              # UI components
├── lib/
│   ├── prisma.ts        # Prisma client
│   └── auth.ts          # Auth helpers
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
└── scripts/
    └── create-admin.ts  # Admin creation script
```

## 🗄️ Database Schema

### Admin
- Username (unique)
- Password (hashed)
- Created/Updated timestamps

### Voucher
- Code (unique, uppercase)
- Status (active/inactive)
- Created/Updated timestamps
- UsedAt (nullable)

## 🔐 API Endpoints

### Public
- `POST /api/vouchers/verify` - Verify voucher untuk payment

### Protected (Admin)
- `GET /api/vouchers` - List semua voucher
- `POST /api/vouchers` - Create voucher baru
- `PATCH /api/vouchers/[id]` - Update voucher
- `DELETE /api/vouchers/[id]` - Delete voucher

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 5.19.0
- **Auth:** NextAuth.js v4
- **UI:** Tailwind CSS + Shadcn/ui
- **Styling:** Glass morphism + Gradient animations

## 📝 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run create-admin     # Create admin user
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 📚 Documentation

- [Admin Setup Guide](./ADMIN_SETUP.md)
- [Setup Instructions](./SETUP.md)

## 🚀 Deployment

### Quick Deploy Options

- **🚀 Vercel** (Recommended): [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)
- **🖥️ VPS**: [QUICK_START_VPS.md](./QUICK_START_VPS.md)
- **📚 Full Guide**: [DEPLOY_VPS.md](./DEPLOY_VPS.md)
- **📖 Overview**: [README_DEPLOYMENT.md](./README_DEPLOYMENT.md)

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## 📄 License

MIT
