"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TemplateSelector, { type Template } from "@/components/booth/template-selector"

type Step = "template" | "camera" | "preview" | "done"

export default function PhotoWorkflow() {
  const [currentStep, setCurrentStep] = React.useState<Step>("template")
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null)
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null)
  
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isVideoReady, setIsVideoReady] = React.useState(false)

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  function handleTemplateSelect(template: Template) {
    setSelectedTemplate(template)
    setTimeout(() => setCurrentStep("camera"), 300)
  }

  const startCamera = React.useCallback(async () => {
    try {
      setError(null)
      setIsVideoReady(false)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user"
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setIsVideoReady(true)
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.")
    }
  }, [])

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsVideoReady(false)
  }

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) {
      console.log("Missing refs:", { video: videoRef.current, canvas: canvasRef.current })
      return
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) {
      console.log("No context")
      return
    }

    // Check if video is ready
    if (!video.videoWidth || !video.videoHeight) {
      console.log("Video not ready:", { width: video.videoWidth, height: video.videoHeight })
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)
    
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.95)
    console.log("Captured image length:", imageDataUrl.length)
    setCapturedImage(imageDataUrl)
    stopCamera()
    setCurrentStep("preview")
  }

  function retakePhoto() {
    setCapturedImage(null)
    setCurrentStep("camera")
    setTimeout(startCamera, 300)
  }

  function downloadPhoto() {
    if (!capturedImage) return
    const link = document.createElement("a")
    link.download = `photo-booth-${Date.now()}.jpg`
    link.href = capturedImage
    link.click()
    setCurrentStep("done")
  }

  function printPhoto() {
    if (!capturedImage) return
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head><title>Print Photo</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:white}img{max-width:100%;max-height:100vh}</style></head>
        <body><img src="${capturedImage}" alt="Photo Booth" /></body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
    setCurrentStep("done")
  }

  function startOver() {
    setCurrentStep("template")
    setSelectedTemplate(null)
    setCapturedImage(null)
    stopCamera()
  }

  // Step indicator
  const steps = [
    { key: "template", label: "Template", icon: "🎨" },
    { key: "camera", label: "Foto", icon: "📸" },
    { key: "preview", label: "Preview", icon: "👀" },
    { key: "done", label: "Selesai", icon: "✅" }
  ]

  React.useEffect(() => {
    if (currentStep === "camera" && !stream) {
      const timer = setTimeout(() => {
        startCamera()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentStep, stream, startCamera])

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const stepIndex = steps.findIndex(s => s.key === currentStep)
          const isActive = step.key === currentStep
          const isCompleted = stepIndex > index
          
          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300
                  ${isActive ? "bg-primary text-primary-foreground scale-110" : ""}
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-muted text-muted-foreground" : ""}
                `}>
                  {isCompleted ? "✓" : step.icon}
                </div>
                <span className="text-xs mt-2 font-semibold text-center">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 transition-all duration-300
                  ${isCompleted ? "bg-green-500" : "bg-muted"}
                `} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {/* Step 1: Template Selection */}
        {currentStep === "template" && (
          <TemplateSelector onSelect={handleTemplateSelect} />
        )}

        {/* Step 2: Camera Capture */}
        {currentStep === "camera" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">📸 Ambil Foto</h2>
              <p className="text-muted-foreground">
                Template: {selectedTemplate?.name}
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400 font-semibold">{error}</p>
              </div>
            )}

            {stream ? (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border-4 border-primary">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 border-8 border-dashed border-white/30 rounded-xl pointer-events-none" />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={capturePhoto} 
                    disabled={!isVideoReady}
                    size="lg" 
                    className="flex-1 h-16 text-xl font-bold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {isVideoReady ? "Ambil Foto" : "Loading..."}
                    </span>
                  </Button>
                  <Button onClick={stopCamera} variant="outline" size="lg" className="h-16 px-8 font-semibold">
                    Batal
                  </Button>
                </div>
              </div>
            ) : !error && (
              <div className="text-center space-y-4 py-12">
                <div className="text-6xl">⏳</div>
                <p className="text-muted-foreground">Memulai kamera...</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Preview */}
        {currentStep === "preview" && capturedImage && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">👀 Preview Foto</h2>
              <p className="text-muted-foreground">
                Lihat hasil foto Anda
              </p>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border-4 border-primary">
              <img
                src={capturedImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button onClick={retakePhoto} variant="outline" size="lg" className="h-16 text-lg font-bold">
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Ambil Ulang
                </span>
              </Button>
              <Button onClick={downloadPhoto} size="lg" className="h-16 text-lg font-bold bg-primary hover:bg-primary/90">
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </span>
              </Button>
              <Button onClick={printPhoto} size="lg" className="h-16 text-lg font-bold bg-green-600 hover:bg-green-700 text-white">
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Done */}
        {currentStep === "done" && (
          <div className="text-center space-y-6 py-12">
            <div className="text-7xl">🎉</div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Selesai!</h2>
              <p className="text-muted-foreground text-lg">
                Foto Anda sudah diproses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={startOver} size="lg" className="h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Ambil Foto Lagi
                </span>
              </Button>
              <Link href="/" className="inline-flex">
                <Button variant="outline" size="lg" className="h-14 text-lg font-bold w-full">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Kembali ke Home
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

