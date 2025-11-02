"use client"

import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Voucher {
  id: string
  code: string
  status: string
  createdAt: string
  usedAt: string | null
}

export default function AdminDashboard() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [newCode, setNewCode] = useState("")
  const [newStatus, setNewStatus] = useState("active")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchVouchers()
  }, [])

  async function fetchVouchers() {
    try {
      const response = await fetch("/api/vouchers")
      if (response.ok) {
        const data = await response.json()
        setVouchers(data)
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateVoucher(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const response = await fetch("/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCode,
          status: newStatus,
        }),
      })

      if (response.ok) {
        setNewCode("")
        setNewStatus("active")
        fetchVouchers()
      } else {
        const data = await response.json()
        setError(data.error || "Gagal membuat voucher")
      }
    } catch (error) {
      setError("Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleToggleStatus(voucher: Voucher) {
    try {
      const newStatus = voucher.status === "active" ? "inactive" : "active"
      await fetch(`/api/vouchers/${voucher.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchVouchers()
    } catch (error) {
      console.error("Error updating voucher:", error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus voucher ini?")) return

    try {
      await fetch(`/api/vouchers/${id}`, {
        method: "DELETE",
      })
      fetchVouchers()
    } catch (error) {
      console.error("Error deleting voucher:", error)
    }
  }

  async function handleLogout() {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-2 border-white/40 hover:bg-white/25 text-white"
          >
            Keluar
          </Button>
        </div>

        {/* Create Voucher Form */}
        <Card className="bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-shimmer"></div>
          <CardHeader className="pt-8">
            <CardTitle className="text-2xl font-bold text-white">
              Buat Voucher Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateVoucher} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-white block mb-2">
                    Kode Voucher
                  </label>
                  <Input
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: PB-AB12CD"
                    className="h-12 bg-white/10 backdrop-blur-md border-2 border-white/30 focus:border-purple-500/50 text-white placeholder-white/60"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white block mb-2">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full h-12 bg-white/10 backdrop-blur-md border-2 border-white/30 focus:border-purple-500/50 text-white rounded-md px-4"
                    disabled={submitting}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {submitting ? "Membuat..." : "Buat Voucher"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Vouchers List */}
        <Card className="bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-shimmer"></div>
          <CardHeader className="pt-8">
            <CardTitle className="text-2xl font-bold text-white">
              Daftar Voucher ({vouchers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-white/80 text-center py-8">Memuat...</p>
            ) : vouchers.length === 0 ? (
              <p className="text-white/80 text-center py-8">Belum ada voucher</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-white font-semibold">Kode</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Dibuat</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Digunakan</th>
                      <th className="text-right py-3 px-4 text-white font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map((voucher) => (
                      <tr key={voucher.id} className="border-b border-white/10">
                        <td className="py-3 px-4 text-white font-mono font-semibold">
                          {voucher.code}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleStatus(voucher)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              voucher.status === "active"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                            }`}
                          >
                            {voucher.status === "active" ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-white/80 text-sm">
                          {new Date(voucher.createdAt).toLocaleDateString("id-ID")}
                        </td>
                        <td className="py-3 px-4 text-white/80 text-sm">
                          {voucher.usedAt
                            ? new Date(voucher.usedAt).toLocaleDateString("id-ID")
                            : "-"}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            onClick={() => handleDelete(voucher.id)}
                            variant="outline"
                            className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                            size="sm"
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

