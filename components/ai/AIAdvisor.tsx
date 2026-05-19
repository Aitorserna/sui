'use client'

import { useState, useRef } from 'react'
import { Upload, Sparkles, X, Camera } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface Recommendation {
  cuts: string[]
  reasoning: string
  tips: string[]
  avoid: string[]
}

export default function AIAdvisor() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Recommendation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor sube una imagen válida.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setResult(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })
      if (!res.ok) throw new Error('Error al analizar la imagen')
      const data = await res.json()
      setResult(data.recommendation)
    } catch (e) {
      setError('No se pudo analizar la imagen. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Inteligencia Artificial</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Asesor <span className="text-gold-500">IA de Imagen</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Sube una foto de tu rostro y nuestro asistente IA analizará tu forma facial
            para recomendarte los mejores cortes personalizados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload area */}
          <Card gold>
            <CardContent className="p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold-500" />
                Subir Foto
              </h3>

              {!image ? (
                <div
                  className="border-2 border-dashed border-gold-500/30 hover:border-gold-500/60 rounded-xl p-12 text-center cursor-pointer transition-all bg-gold-500/5 hover:bg-gold-500/10"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files[0]
                    if (file) handleFile(file)
                  }}
                >
                  <Upload className="w-12 h-12 text-gold-500/60 mx-auto mb-4" />
                  <p className="text-white/70 font-medium mb-2">Arrastra tu foto aquí</p>
                  <p className="text-white/30 text-sm">o haz clic para seleccionar</p>
                  <p className="text-white/20 text-xs mt-3">JPG, PNG hasta 5MB</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="Preview" className="w-full h-64 object-cover" />
                  <button
                    onClick={() => { setImage(null); setResult(null) }}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {error && (
                <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
              )}

              <Button
                onClick={analyze}
                disabled={!image}
                loading={loading}
                className="w-full mt-4"
                size="lg"
              >
                <Sparkles className="w-5 h-5" />
                {loading ? 'Analizando...' : 'Analizar con IA'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardContent className="p-6 h-full">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                Recomendaciones
              </h3>

              {!result && !loading && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-gold-500/50" />
                  </div>
                  <p className="text-white/30 text-sm">
                    Sube una foto para recibir recomendaciones personalizadas
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-64 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-white/50 text-sm">Analizando tu imagen...</p>
                </div>
              )}

              {result && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-2">Cortes Recomendados</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.cuts.map((cut) => (
                        <span key={cut} className="px-3 py-1.5 bg-gold-500/20 text-gold-300 border border-gold-500/30 rounded-full text-sm font-medium">
                          {cut}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-2">Por qué estos cortes</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{result.reasoning}</p>
                  </div>

                  {result.tips.length > 0 && (
                    <div>
                      <h4 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-2">Consejos de Estilo</h4>
                      <ul className="space-y-1.5">
                        {result.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-white/60 text-sm">
                            <span className="text-gold-500 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.avoid.length > 0 && (
                    <div>
                      <h4 className="text-red-400/70 text-xs font-semibold uppercase tracking-wider mb-2">A Evitar</h4>
                      <ul className="space-y-1.5">
                        {result.avoid.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-white/40 text-sm">
                            <span className="text-red-400/50 mt-0.5">✕</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
