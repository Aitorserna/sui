'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Scissors } from 'lucide-react'

function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradient blobs */}
      <div className="blob-1 absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
      <div className="blob-2 absolute bottom-[-30%] right-[-15%] w-[80vw] h-[80vw] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #DC143C 0%, transparent 65%)' }} />
      <div className="blob-3 absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
  )
}

const words = ['Fade', 'Corte', 'Barba', 'Cejas', 'Estilo']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBg />

      {/* Floating decorative scissors */}
      <motion.div
        className="absolute top-32 right-[10%] text-gold-500/10 float hidden lg:block"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Scissors className="w-32 h-32" />
      </motion.div>

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] spin-slow opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <circle cx="300" cy="300" r="290" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="8 16" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="#DC143C" strokeWidth="0.5" strokeDasharray="4 20" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium">Barbería · Reservas Online</span>
          </div>
        </motion.div>

        {/* Main title */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-none"
          >
            <span className="block text-white text-[clamp(4rem,15vw,11rem)] tracking-tight">Le</span>
            <span className="block shimmer-text text-[clamp(4rem,15vw,11rem)] tracking-tight -mt-6">Barber</span>
          </motion.h1>
        </div>

        {/* Animated word loop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8 flex-wrap"
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass px-4 py-1.5 rounded-full text-sm text-white/70 font-medium tracking-wider"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Con <span className="text-white font-semibold">Marcos Martínez</span> —
          maestro del fade, corte clásico, barba y cejas.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/30 text-sm mb-12"
        >
          Reserva con solo <span className="text-gold-400 font-bold">3€ de señal</span> · Confirma Marcos en menos de 24h
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/reservar">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black text-base uppercase tracking-widest"
            >
              <span>Reservar Ahora · 3€</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
            </motion.button>
          </Link>
          <a href="#servicios">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full glass border border-white/20 hover:border-gold-500/50 text-white font-semibold text-base uppercase tracking-wider transition-colors"
            >
              Ver precios
            </motion.button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-12 mt-20"
        >
          {[
            { value: '3€', label: 'Solo señal' },
            { value: '<24h', label: 'Confirmación' },
            { value: '6', label: 'Servicios' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gold-500 leading-none">{s.value}</div>
              <div className="text-white/30 text-xs mt-2 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
