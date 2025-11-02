"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VoucherInput() {
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  function openDesktopApp(voucherCode: string) {
    try {
      // Try to open desktop app with custom protocol
      // Format: photobooth://session/VOUCHER_CODE
      window.location.href = `photobooth://session/${voucherCode}`
    } catch (error) {
      console.error("Failed to open desktop app:", error)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!code || code.trim().length < 6) {
      setError("Kode voucher minimal 6 karakter.")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/vouchers/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Voucher tidak valid")
        return
      }

      if (data.valid) {
        // Try to open desktop app using custom protocol
        openDesktopApp(code.trim())
        
        // Also open web fallback in case desktop app is not installed
        setTimeout(() => {
          router.push("/booth/app")
        }, 500)
      } else {
        setError("Voucher tidak valid")
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden animate-scale-in">
      <div className="h-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-shimmer"></div>
      
      <CardHeader className="pb-2 text-center pt-10">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Link href="/booth/pay" aria-label="Kembali ke halaman pembayaran">
            <Button variant="outline" className="bg-white/10 backdrop-blur-md border-2 border-white/40 hover:bg-white/25 text-white transition-all duration-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </span>
            </Button>
          </Link>
        </div>
        
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        </div>
        <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-balance text-white mb-4">
          Pembayaran Tunai
        </CardTitle>
      
      </CardHeader>
      
      <CardContent className="pt-3 pb-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="voucher" className="text-lg md:text-xl font-semibold text-white">
              Masukkan Kode Voucher
            </label>
            <div className="relative">
              <Input
                id="voucher"
                aria-label="Kode voucher"
                aria-describedby="voucher-help"
                placeholder="Contoh: PB-AB12CD"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-14 text-lg font-mono text-center bg-white/10 backdrop-blur-md border-2 border-white/30 focus:border-blue-500/50 rounded-xl text-white placeholder-white/60"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                pattern="[A-Za-z0-9-]{6,}"
                title="Minimal 6 karakter, huruf/angka/tanda hubung."
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
            <p id="voucher-help" className="text-base md:text-lg text-white text-center font-semibold">
              Gunakan huruf kapital/angka, minimal 6 karakter. Contoh: PB-AB12CD
            </p>
            {error ? (
              <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p role="alert" className="text-sm md:text-base text-white font-semibold">
                  {error}
                </p>
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white btn-modern shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memeriksa Voucher...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Gunakan Voucher
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="pt-6">
        <div className="w-full text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base text-white font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Belum punya voucher? Silakan beli ke kasir terlebih dahulu.
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}