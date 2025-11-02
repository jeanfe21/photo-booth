import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PhotoWorkflow from "@/components/booth/photo-workflow"

export default function BoothAppPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center relative py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>

      <section className="w-full max-w-5xl px-8 md:px-12 relative z-10">
        <Card className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer"></div>
          
          <CardHeader className="text-center space-y-4 py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <CardTitle className="text-balance text-4xl md:text-5xl font-bold gradient-text">
              Photo Booth Studio
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ambil foto profesional dengan mudah
            </p>
          </CardHeader>
          
          <CardContent className="px-8 md:px-12 pb-12">
            <PhotoWorkflow />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
