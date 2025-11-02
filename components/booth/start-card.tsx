import Image from "next/image"

export default function StartCard() {
  return (
    <div className="rounded-3xl p-10 md:p-12 bg-accent text-accent-foreground animate-fade-up">
      <div className="flex items-center gap-8">
        <Image
          src="/camera-icon-photo-booth.jpg"
          alt="Ikon kamera"
          width={140}
          height={140}
          className="rounded-xl ring-1 ring-border"
        />
        <div className="space-y-2">
          <p className="font-semibold text-3xl md:text-4xl text-pretty">Selamat datang di Photo Booth</p>
          <p className="text-xl md:text-2xl opacity-90 text-pretty">
            Abadikan momen spesial Anda dengan tema yang seru dan modern.
          </p>
        </div>
      </div>
    </div>
  )
}
