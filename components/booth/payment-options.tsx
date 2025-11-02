import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PaymentOptions() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-scale-in">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-up">
          Pilih Metode Pembayaran
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-semibold">
          QRIS untuk bayar otomatis dengan aplikasi digital, atau tunai dengan voucher dari kasir.
        </p>
      </div>

      {/* Payment Options */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {/* QRIS Option */}
      <Card className="p-6 md:p-8 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 transition-all duration-300 hover:shadow-2xl hover:ring-2 ring-purple-500/60 card-hover group">
        <div className="flex items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl md:text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">QRIS</p>
                <p className="text-sm text-white font-semibold">Pembayaran Digital</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-white leading-relaxed font-semibold">Scan kode dan bayar secara instan dengan aplikasi pembayaran favorit Anda.</p>
            <div className="flex items-center gap-2 text-sm text-purple-300 font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Proses cepat & aman
            </div>
          </div>
          <Link href="/booth/pay/qris" aria-label="Pilih pembayaran QRIS">
            <Button className="h-12 px-6 text-base font-bold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white btn-modern shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                Pilih QRIS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Cash Option */}
      <Card className="p-6 md:p-8 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 transition-all duration-300 hover:shadow-2xl hover:ring-2 ring-blue-500/60 card-hover group">
        <div className="flex items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl md:text-2xl text-white">Tunai</p>
                <p className="text-sm text-white font-semibold">Pembayaran Tradisional</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-white leading-relaxed font-semibold">Beli voucher di kasir lalu tukarkan di sini untuk melanjutkan sesi foto.</p>
            <div className="flex items-center gap-2 text-sm text-blue-300 font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fleksibel & mudah
            </div>
          </div>
          <Link href="/booth/pay/cash" aria-label="Pilih pembayaran tunai">
            <Button variant="outline" className="h-12 px-6 text-base font-bold rounded-xl bg-white/15 backdrop-blur-md border-2 border-white/40 hover:bg-white/25 text-white btn-modern shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                Pilih Tunai
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>
      </Card>
      </div>
    </div>
  )
}
