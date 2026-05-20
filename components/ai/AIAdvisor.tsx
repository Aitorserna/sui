'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Sparkles, X, Camera } from 'lucide-react'

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
    if (!file.type.startsWith('image/')) { setError('Sube una imagen válida.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('La imagen no puede superar 5MB.'); return }
    const reader = new FileReader()
    reader.onload = (e) => { setImage(e.target?.result as string); setResult(null); setError(null) }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/ai-advisor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image }) })
      if (!res.ok) throw new Error('Error al analizar')
      const data = await res.json()
      setResult(data.recommendation)
    } catch { setError('No se pudo analizar la imagen. Inténtalo de nuevo.') }
    finally { setLoading(false) }
  }

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #DC143C 0%, transparent 50%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">Inteligencia Artificial</span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white uppercase leading-none mb-4">
            Asesor <span className="text-gold-500">IA</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/40 text-base max-w-xl mx-auto">
            Sube una foto, analizamos tu rostro y te recomendamos los mejores cortes personalizados
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl border border-white/8 p-6">
            <h3 className="text-white font-black text-lg uppercase tracking-wider mb-5 flex items-center gap-2">
              <Camera className="w-5 h-5 text-gold-500" /> Tu foto
            </h3>

            <AnimatePresence mode="wait">
              {!image ? (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                  className="border-2 border-dashed border-gold-500/20 hover:border-gold-500/50 rounded-xl p-12 text-center cursor-pointer transition-all hover:bg-gold-500/5 group"
                >
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Upload className="w-10 h-10 text-gold-500/40 group-hover:text-gold-500/70 mx-auto mb-3 transition-colors" />
                  </motion.div>
                  <p className="text-white/50 font-medium mb-1">Arrastra tu foto aquí</p>
                  <p className="text-white/20 text-xs">o haz clic para seleccionar · JPG, PNG hasta 5MB</p>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="Preview" className="w-full h-56 object-cover" />
                  <button onClick={() => { setImage(null); setResult(null) }}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <input ref={inputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

            <motion.button
              onClick={analyze}
              disabled={!image || loading}
              whileHover={image && !loading ? { scale: 1.02 } : {}}
              whileTap={image && !loading ? { scale: 0.98 } : {}}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Analizando...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Analizar con IA</>
              )}
            </motion.button>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl border border-white/8 p-6">
            <h3 className="text-white font-black text-lg uppercase tracking-wider mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-500" /> Recomendaciones
            </h3>

            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/5 border border-gold-500/15 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-gold-500/30" />
                  </div>
                  <p className="text-white/20 text-sm">Sube una foto para recibir recomendaciones personalizadas</p>
                </motion.div>
              )}

              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-64 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-white/30 text-sm">Analizando tu imagen...</p>
                </motion.div>
              )}

              {result && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div>
                    <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Cortes Recomendados</p>
                    <div className="flex flex-wrap gap-2">
                      {result.cuts.map((cut) => (
                        <span key={cut} className="px-3 py-1.5 rounded-full text-sm font-bold"
                          style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}>
                          {cut}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Por qué estos cortes</p>
                    <p className="text-white/50 text-sm leading-relaxed">{result.reasoning}</p>
                  </div>
                  {result.tips.length > 0 && (
                    <div>
                      <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Consejos</p>
                      <ul className="space-y-1.5">
                        {result.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-white/50 text-sm">
                            <span className="text-gold-500 mt-0.5 shrink-0">·</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.avoid.length > 0 && (
                    <div>
                      <p className="text-red-400/60 text-xs font-bold uppercase tracking-widest mb-2">A Evitar</p>
                      <ul className="space-y-1.5">
                        {result.avoid.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-white/30 text-sm">
                            <span className="text-red-400/40 shrink-0">✕</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
