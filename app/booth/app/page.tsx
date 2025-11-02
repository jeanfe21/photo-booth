import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BoothAppPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>

      <section className="w-full max-w-5xl px-8 md:px-12 relative z-10 h-full flex items-center">
        <Card className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-scale-in w-full h-full max-h-[90vh] flex flex-col">
          <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer"></div>
          
          <CardHeader className="text-center space-y-4 py-8 flex-shrink-0">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <CardTitle className="text-balance text-4xl md:text-6xl font-bold gradient-text">
              Siap Berpose!
            </CardTitle>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pembayaran berhasil! Sekarang saatnya untuk menciptakan foto profesional yang memukau.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 pb-8 flex-1 flex flex-col justify-center">
            {/* Features preview */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="text-center space-y-2 p-4 rounded-xl bg-primary/5">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Kualitas HD</h3>
                <p className="text-xs text-muted-foreground">Foto berkualitas tinggi untuk hasil terbaik</p>
              </div>
              <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Cepat & Mudah</h3>
                <p className="text-xs text-muted-foreground">Proses foto hanya dalam hitungan detik</p>
              </div>
              <div className="text-center space-y-2 p-4 rounded-xl bg-primary/5">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Filter Profesional</h3>
                <p className="text-xs text-muted-foreground">Berbagai filter untuk hasil yang sempurna</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 h-14 text-xl font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 btn-modern">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Mulai Foto
                </span>
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full h-14 text-lg font-semibold rounded-xl bg-transparent border-2 hover:bg-accent hover:text-accent-foreground btn-modern">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Home
                  </span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
