import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST - Verify voucher for payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Voucher code is required" },
        { status: 400 }
      )
    }

    const voucher = await prisma.voucher.findUnique({
      where: { code: code.toUpperCase().trim() }
    })

    if (!voucher) {
      return NextResponse.json(
        { error: "Voucher tidak ditemukan" },
        { status: 404 }
      )
    }

    if (voucher.status !== "active") {
      return NextResponse.json(
        { error: "Voucher tidak aktif" },
        { status: 400 }
      )
    }

    if (voucher.usedAt) {
      return NextResponse.json(
        { error: "Voucher sudah digunakan" },
        { status: 400 }
      )
    }

    // Mark voucher as used
    await prisma.voucher.update({
      where: { id: voucher.id },
      data: { usedAt: new Date() }
    })

    return NextResponse.json({ valid: true, voucher })
  } catch (error) {
    console.error("Error verifying voucher:", error)
    return NextResponse.json(
      { error: "Failed to verify voucher" },
      { status: 500 }
    )
  }
}

