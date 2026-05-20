'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Clock, ArrowRight, Info } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Service } from '@/lib/types'

const FALLBACK: Service[] = [
  { id: '1', name: 'Corte Clásico',    description: 'Tijeras, acabado impecable y producto incluido',             duration: 45, price: 1200, category: 'Corte',      is_active: true, created_at: '' },
  { id: '2', name: 'Fade',             description: 'Degradado preciso a máquina. El sello de la casa',           duration: 60, price: 1200, category: 'Corte',      is_active: true, created_at: '' },
  { id: '3', name: 'Corte + Barba',    description: 'Corte más perfilado completo de barba',                      duration: 75, price: 1700, category: 'Combo',      is_active: true, created_at: '' },
  { id: '4', name: 'Corte + Cejas',    description: 'Corte más depilación y perfilado de cejas',                  duration: 60, price: 1500, category: 'Combo',      is_active: true, created_at: '' },
  { id: '5', name: 'Arreglo de Barba', description: 'Perfilado y definición de barba con navaja y aceites',       duration: 30, price:  500, category: 'Barba',      is_active: true, created_at: '' },
  { id: '6', name: 'Cejas',            description: 'Depilación y perfilado para un look limpio y definido',      duration: 15, price:  300, category: 'Cejas',      is_active: true, created_at: '' },
  { id: '7', name: 'Cuidado Capilar',  description: 'Tratamiento, hidratación y masaje del cuero cabelludo',      duration: 60, price: 1200, category: 'Tratamiento',is_active: true, created_at: '' },
  { id: '8', name: 'Peinado Masculino','description': 'Asesoramiento y peinado con productos profesionales',      duration: 30, price: 1000, category: 'Peinado',    is_active: true, created_at: '' },
]

const catColor: Record<string, string> = {
  Corte:       '#3b82f6',
  Combo:       '#C9A84C',
  Barba:       '#22c55e',
  Cejas:       '#a855f7',
  Tratamiento: '#f97316',
  Peinado:     '#06b6d4',
}

function SectionTitle() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-gold-500" />
        <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">Servicios & Precios</span>
        <div className="h-px w-8 bg-gold-500" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-6xl font-black text-white uppercase mb-4 leading-none">
        La <span className="text-gold-500">Cartelera</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
        className="text-white/30 text-sm">Sin tintes ni permanentes</motion.p>
    </div>
  )
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(d => setServices(d.services || [])).catch(() => {})
  }, [])

  const displayed = services.length > 0 ? services : FALLBACK

  return (
    <section id="servicios" className="py-28 bg-zinc-950 relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle />

        {/* Deposit notice */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass border border-gold-500/20 rounded-2xl px-6 py-4 mb-12 max-w-2xl mx-auto flex items-start gap-3">
          <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <p className="text-white/60 text-sm leading-relaxed">
            <span className="text-gold-400 font-bold">Solo se cobra 3€ de señal</span> al reservar.
            El precio del servicio se abona en el local el día de tu visita.
          </p>
        </motion.div>

        {/* Services grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayed.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link href={`/reservar?service=${service.id}`} className="block h-full">
                <div className="glass h-full rounded-2xl p-5 border border-white/5 hover:border-gold-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  {/* Color bar top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-60 transition-opacity group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${catColor[service.category] || '#C9A84C'}, transparent)` }} />

                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ color: catColor[service.category] || '#C9A84C', background: `${catColor[service.category] || '#C9A84C'}18` }}>
                      {service.category}
                    </span>
                    <span className="text-2xl font-black text-white group-hover:text-gold-400 transition-colors">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <h3 className="text-white font-black text-lg uppercase mb-2 leading-tight group-hover:text-gold-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-5">{service.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-white/25 text-xs">
                      <Clock className="w-3.5 h-3.5" /> {service.duration} min
                    </div>
                    <span className="flex items-center gap-1 text-gold-500 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Reservar <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Extra time */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-white/25 text-sm mt-8">
          Hora extra · <span className="text-white/50">+10€</span> según el trabajo
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-10">
          <Link href="/reservar">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black text-base uppercase tracking-widest"
            >
              Reservar — Solo 3€ señal <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
