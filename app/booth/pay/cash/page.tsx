import VoucherInput from "@/components/booth/voucher-input"

export default function CashPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <section className="w-full max-w-3xl px-8 md:px-12 relative z-10">
        <VoucherInput />
      </section>
    </main>
  )
}
