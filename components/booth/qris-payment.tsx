import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QRISPayment() {
  return (
    <Card className="bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden animate-scale-in">
      <div className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-shimmer"></div>
      
      <div className="px-6 md:px-8 py-10 space-y-8">
        {/* Back Button */}
        <div className="flex justify-start">
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

        {/* QR Code Section */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-2xl"></div>
            <Image
              src="/qris.jpeg"
              alt="Kode QR QRIS"
              width={300}
              height={300}
              className="relative rounded-2xl shadow-2xl ring-4 ring-purple-500/30"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <Link href="/booth/app" aria-label="Masuk ke aplikasi setelah membayar">
            <Button className="w-full h-16 text-xl font-bold rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white btn-modern shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Saya Sudah Bayar
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}