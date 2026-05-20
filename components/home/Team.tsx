'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, Clock, ArrowRight } from 'lucide-react'

const specialties = ['Fade', 'Corte Clásico', 'Arreglo de Barba', 'Cejas', 'Cuidado Capilar', 'Peinado Masculino']
const notAvailable = ['Tintes', 'Permanentes']

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="barbero" className="py-28 bg-black relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-10 blob-1"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 translate-x-1/3 translate-y-1/3 rounded-full opacity-8 blob-2"
        style={{ background: 'radial-gradient(circle, #DC143C, transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">El Maestro</span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white uppercase leading-none">
            Marcos <span className="text-gold-500">Martínez</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — animated card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #DC143C)' }} />

            <div className="relative glass rounded-3xl border border-white/10 overflow-hidden aspect-square flex flex-col items-center justify-center p-10">
              {/* Animated bg pattern */}
              <div className="absolute inset-0 opacity-5 spin-slow"
                style={{
                  backgroundImage: 'repeating-conic-gradient(#C9A84C 0deg, transparent 1deg, transparent 9deg)',
                  backgroundSize: '40px 40px',
                }} />

              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 border-2 border-gold-500/30 flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border border-gold-500/40 animate-ping" style={{ animationDuration: '3s' }} />
              </motion.div>

              <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-1">Marcos</h3>
              <p className="text-gold-500 text-sm uppercase tracking-widest mb-4">Martínez</p>

              <div className="glass px-4 py-2 rounded-full">
                <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Le Barber · Est. 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Barbero profesional con dominio total de los estilos más demandados.
              Cada cliente es un proyecto único — por eso Marcos revisa personalmente
              cada reserva antes de confirmarla.
            </p>

            {/* Specialties */}
            <div className="mb-6">
              <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">Especialidades</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium"
                    style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> {s}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Not available */}
            <div className="mb-8">
              <p className="text-white/25 text-xs font-bold uppercase tracking-widest mb-3">No disponible</p>
              <div className="flex flex-wrap gap-2">
                {notAvailable.map((s) => (
                  <span key={s} className="text-sm px-3 py-1.5 rounded-full text-white/20 border border-white/10 line-through">{s}</span>
                ))}
              </div>
            </div>

            {/* Availability box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-5 border border-gold-500/15 mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">Disponibilidad variable</p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Reserva tu hora y Marcos confirmará en menos de 24h.
                    Si no puede, <span className="text-gold-400">se devuelven los 3€</span> automáticamente.
                  </p>
                </div>
              </div>
            </motion.div>

            <Link href="/reservar">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black uppercase tracking-widest"
              >
                Reservar con Marcos — 3€ señal <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
