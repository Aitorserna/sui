'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import type { Service } from '@/lib/types'

const categoryColors: Record<string, string> = {
  Corte:      'text-blue-300 bg-blue-400/10 border-blue-400/20',
  Combo:      'text-gold-400 bg-gold-400/10 border-gold-400/20',
  Barba:      'text-green-300 bg-green-400/10 border-green-400/20',
  Cejas:      'text-purple-300 bg-purple-400/10 border-purple-400/20',
  Tratamiento:'text-orange-300 bg-orange-400/10 border-orange-400/20',
  Peinado:    'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
}

const FALLBACK: Service[] = [
  { id: '1', name: 'Corte Clásico', description: 'Corte con tijeras, producto de peinado incluido', duration: 45, price: 1200, category: 'Corte', is_active: true, created_at: '' },
  { id: '2', name: 'Fade', description: 'Degradado preciso a máquina. El sello de la casa', duration: 60, price: 1200, category: 'Corte', is_active: true, created_at: '' },
  { id: '3', name: 'Corte + Barba', description: 'Corte más arreglo de barba. El combo más popular', duration: 75, price: 1700, category: 'Combo', is_active: true, created_at: '' },
  { id: '4', name: 'Corte + Cejas', description: 'Corte más perfilado de cejas', duration: 60, price: 1500, category: 'Combo', is_active: true, created_at: '' },
  { id: '5', name: 'Arreglo de Barba', description: 'Perfilado y definición de barba con navaja', duration: 30, price: 500, category: 'Barba', is_active: true, created_at: '' },
  { id: '6', name: 'Cejas', description: 'Depilación y perfilado de cejas', duration: 15, price: 300, category: 'Cejas', is_active: true, created_at: '' },
  { id: '7', name: 'Cuidado Capilar', description: 'Tratamiento, hidratación y masaje capilar', duration: 60, price: 1200, category: 'Tratamiento', is_active: true, created_at: '' },
  { id: '8', name: 'Peinado Masculino', description: 'Estilo y peinado con productos profesionales', duration: 30, price: 1000, category: 'Peinado', is_active: true, created_at: '' },
]

export default function Services() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(d => setServices(d.services || [])).catch(() => {})
  }, [])

  const displayed = services.length > 0 ? services : FALLBACK

  return (
    <section id="servicios" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">Servicios & Precios</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase mb-4">
            La <span className="text-gold-500">Cartelera</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            Sin tintes ni permanentes. Solo lo que Marcos domina al 100%.
          </p>
        </div>

        {/* Deposit notice */}
        <div className="flex items-start gap-3 bg-gold-500/10 border border-gold-500/30 rounded-xl px-5 py-4 mb-10 max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-gold-400 font-bold">Solo se cobra 3€ de señal</span> al reservar para confirmar tu cita.
            El resto del precio se abona directamente en el local el día de tu visita.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayed.map((service) => (
            <Card key={service.id} className="group hover:border-gold-500/40 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded border font-semibold ${categoryColors[service.category] || 'text-white/40 bg-white/5 border-white/10'}`}>
                    {service.category}
                  </span>
                  <span className="text-gold-500 text-xl font-black">
                    {formatCurrency(service.price)}
                  </span>
                </div>
                <h3 className="text-white font-black text-lg mb-1 uppercase group-hover:text-gold-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration} min</span>
                  </div>
                  <Link href={`/reservar?service=${service.id}`}>
                    <button className="flex items-center gap-1 text-gold-500 hover:text-gold-400 text-xs font-bold transition-colors uppercase tracking-wider">
                      Reservar <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extra time note */}
        <div className="text-center mt-8">
          <p className="text-white/30 text-sm">
            ¿Necesitas más tiempo? Se añaden <span className="text-white/60">+10€ por hora extra</span> según el trabajo
          </p>
        </div>

        <div className="text-center mt-8">
          <Link href="/reservar">
            <button className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-black uppercase tracking-widest px-10 py-4 rounded transition-colors text-base">
              🥊 Reservar — Solo 3€ de señal
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
