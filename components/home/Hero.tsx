'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background diagonal stripes — boxing ring style */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9193A 0, #C9193A 2px, transparent 0, transparent 40px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

      {/* Corner boxing decorations */}
      <div className="absolute top-24 left-8 w-12 h-12 border-t-4 border-l-4 border-gold-500/40 hidden lg:block" />
      <div className="absolute top-24 right-8 w-12 h-12 border-t-4 border-r-4 border-gold-500/40 hidden lg:block" />
      <div className="absolute bottom-16 left-8 w-12 h-12 border-b-4 border-l-4 border-gold-500/40 hidden lg:block" />
      <div className="absolute bottom-16 right-8 w-12 h-12 border-b-4 border-r-4 border-gold-500/40 hidden lg:block" />

      {/* Vertical rope lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent hidden lg:block" style={{ left: '7%' }} />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent hidden lg:block" style={{ right: '7%' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Vintage eyebrow */}
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="h-px w-10 bg-gold-500" />
          <span className="text-gold-500 text-xs tracking-[0.5em] uppercase font-bold">Est. 2024 · Barbería</span>
          <div className="h-px w-10 bg-gold-500" />
        </div>

        {/* Main title — boxing poster style */}
        <div className="mb-4">
          <p className="text-white/40 text-sm tracking-[0.4em] uppercase mb-2">Presenta</p>
          <h1 className="font-black uppercase leading-none tracking-tight">
            <span className="block text-white text-7xl sm:text-8xl md:text-9xl">Le</span>
            <span className="block text-gold-500 text-7xl sm:text-8xl md:text-9xl -mt-4">Barber</span>
          </h1>
        </div>

        {/* Boxing belt divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px flex-1 max-w-24 bg-gold-500/50" />
          <div className="flex gap-1">
            {['✦','✦','✦'].map((s, i) => <span key={i} className="text-gold-500 text-xs">{s}</span>)}
          </div>
          <div className="h-px flex-1 max-w-24 bg-gold-500/50" />
        </div>

        <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-2 leading-relaxed italic">
          "El ring donde tu imagen gana el combate"
        </p>
        <p className="text-white/30 text-sm max-w-lg mx-auto mb-10">
          Fades, cortes clásicos, barba, cejas y cuidado capilar.<br />
          Con Marcos Martínez — reserva con solo <span className="text-gold-400 font-bold">3€ de señal</span>
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-10">
          {[
            { value: '1', label: 'Maestro barbero' },
            { value: '∞', label: 'Dedicación' },
            { value: '3€', label: 'Solo señal' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-gold-500">{s.value}</div>
              <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservar">
            <Button size="lg" className="text-base px-10">
              🥊 Reservar Cita — 3€ señal
            </Button>
          </Link>
          <a href="#servicios">
            <Button size="lg" variant="secondary" className="text-base px-10">
              Ver Servicios y Precios
            </Button>
          </a>
        </div>

        {/* Notice */}
        <p className="text-white/20 text-xs mt-8 max-w-sm mx-auto">
          La disponibilidad varía. Marcos confirma tu cita en menos de 24h. El resto del precio se abona en el local.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-gold-500" />
      </div>
    </section>
  )
}
