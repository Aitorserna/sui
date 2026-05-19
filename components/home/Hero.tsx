'use client'

import Link from 'next/link'
import { Scissors, Star, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #C9A84C 0,
              #C9A84C 1px,
              transparent 0,
              transparent 50%
            )`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent" />
      </div>

      {/* Decorative lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
        <div className="w-px h-24 bg-gradient-to-t from-transparent to-gold-500/50" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-gold-500" />
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">Barbería Premium · Madrid</span>
          <div className="h-px w-12 bg-gold-500" />
        </div>

        {/* Main heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-none tracking-tight mb-6">
          <span className="block">El Arte</span>
          <span className="block text-gold-500">del Estilo</span>
          <span className="block text-5xl sm:text-6xl md:text-7xl">Perfecto</span>
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Donde la tradición barbera se fusiona con la excelencia moderna.
          Cada corte es una obra de arte.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-12 mb-12">
          {[
            { value: '15+', label: 'Años de experiencia' },
            { value: '5K+', label: 'Clientes satisfechos' },
            { value: '3', label: 'Maestros barberos' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-gold-500">{s.value}</div>
              <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservar">
            <Button size="lg" className="text-base px-10">
              <Scissors className="w-5 h-5" />
              Reservar Ahora
            </Button>
          </Link>
          <a href="#servicios">
            <Button size="lg" variant="secondary" className="text-base px-10">
              Ver Servicios
            </Button>
          </a>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
          ))}
          <span className="text-white/50 text-sm ml-2">4.9/5 · 500+ reseñas</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gold-500" />
      </div>
    </section>
  )
}
