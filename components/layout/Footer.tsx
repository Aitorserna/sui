'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contacto" className="relative bg-black border-t border-white/5 pt-20 pb-8 overflow-hidden">
      {/* Bg glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-64 opacity-10"
        style={{ background: 'radial-gradient(ellipse, #C9A84C, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                <span className="text-black font-black text-lg">LB</span>
              </div>
              <div>
                <span className="text-white font-black text-2xl tracking-widest uppercase">Le </span>
                <span className="text-gold-500 font-black text-2xl tracking-widest uppercase">Barber</span>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm mb-8">
              Fades, cortes clásicos, barba, cejas y cuidado capilar con Marcos Martínez.
              Reserva con solo 3€ de señal.
            </p>
            <Link href="/reservar">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-bold uppercase tracking-wider hover:bg-gold-500/20 transition-colors"
              >
                Reservar ahora <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Horario</h3>
            <ul className="space-y-3 text-sm">
              {[
                { day: 'Lun — Vie', time: 'Variable' },
                { day: 'Sábado',    time: 'Variable' },
                { day: 'Domingo',   time: 'Cerrado', closed: true },
              ].map(({ day, time, closed }) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="text-white/30">{day}</span>
                  <span className={closed ? 'text-red-400' : 'text-white/60'}>{time}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/15 text-xs mt-4 leading-relaxed">
              * Marcos confirma disponibilidad al reservar
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contacto</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: 'Tu dirección aquí' },
                { Icon: Phone, text: '+34 600 000 000' },
                { Icon: Mail,  text: 'hola@lebarber.es' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-white/30">
                  <Icon className="w-4 h-4 text-gold-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/15 text-xs">© {new Date().getFullYear()} Le Barber. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="text-white/15 hover:text-white/40 text-xs transition-colors">Panel Admin</Link>
            <span className="text-white/15 text-xs">Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
