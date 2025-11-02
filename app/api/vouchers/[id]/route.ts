import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

// PATCH - Update voucher
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { code, status } = body

    const updateData: any = {}
    if (code) updateData.code = code.toUpperCase().trim()
    if (status) updateData.status = status

    const voucher = await prisma.voucher.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(voucher)
  } catch (error: any) {
    console.error("Error updating voucher:", error)
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Voucher not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Failed to update voucher" },
      { status: 500 }
    )
  }
}

// DELETE - Delete voucher
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await prisma.voucher.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting voucher:", error)
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Voucher not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Failed to delete voucher" },
      { status: 500 }
    )
  }
}

