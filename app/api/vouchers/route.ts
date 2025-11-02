import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

// GET - List all vouchers
export async function GET() {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(vouchers)
  } catch (error) {
    console.error("Error fetching vouchers:", error)
    return NextResponse.json(
      { error: "Failed to fetch vouchers" },
      { status: 500 }
    )
  }
}

// POST - Create new voucher
export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { code, status } = body

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Voucher code is required" },
        { status: 400 }
      )
    }

    const voucher = await prisma.voucher.create({
      data: {
        code: code.toUpperCase().trim(),
        status: status || "inactive",
      }
    })

    return NextResponse.json(voucher, { status: 201 })
  } catch (error: any) {
    console.error("Error creating voucher:", error)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Voucher code already exists" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create voucher" },
      { status: 500 }
    )
  }
}

