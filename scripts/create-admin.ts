import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin"
  const password = process.env.ADMIN_PASSWORD || "admin123"

  // Check if admin exists
  const existing = await prisma.admin.findUnique({
    where: { username }
  })

  if (existing) {
    console.log("Admin user already exists!")
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword
    }
  })

  console.log(`✅ Admin user created successfully!`)
  console.log(`Username: ${username}`)
  console.log(`ID: ${admin.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

