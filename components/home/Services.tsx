'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import type { Service } from '@/lib/types'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => setServices(d.services || []))
      .catch(() => {})
  }, [])

  const fallback: Partial<Service>[] = [
    { id: '1', name: 'Corte Clásico', description: 'Corte de cabello tradicional con tijeras y navaja para un acabado impecable', duration: 45, price: 2500, category: 'Corte' },
    { id: '2', name: 'Corte + Barba', description: 'Combinación premium: corte de cabello y arreglo de barba con navaja', duration: 75, price: 4000, category: 'Combo' },
    { id: '3', name: 'Arreglo de Barba', description: 'Perfilado y arreglo de barba con navaja caliente y aceites esenciales', duration: 30, price: 2000, category: 'Barba' },
    { id: '4', name: 'Afeitado Clásico', description: 'Afeitado con navaja caliente, toalla de vapor y productos premium', duration: 45, price: 3000, category: 'Barba' },
    { id: '5', name: 'Corte Fade', description: 'Degradado preciso con máquina para un look moderno y definido', duration: 60, price: 3500, category: 'Corte' },
    { id: '6', name: 'Tratamiento Capilar', description: 'Hidratación profunda, masaje capilar y productos de alta gama', duration: 60, price: 4500, category: 'Tratamiento' },
  ]

  const displayed = services.length > 0 ? services : (fallback as Service[])

  const categoryColors: Record<string, string> = {
    Corte: 'text-blue-400 bg-blue-400/10',
    Combo: 'text-gold-400 bg-gold-400/10',
    Barba: 'text-green-400 bg-green-400/10',
    Tratamiento: 'text-purple-400 bg-purple-400/10',
  }

  return (
    <section id="servicios" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Servicios</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-gold-500">Servicios</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Cada servicio está diseñado para realzar tu imagen con la máxima precisión y cuidado
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service) => (
            <Card key={service.id} className="group hover:border-gold-500/40 transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${categoryColors[service.category] || 'text-white/50 bg-white/5'}`}>
                    {service.category}
                  </span>
                  <span className="text-gold-500 text-xl font-bold">
                    {formatCurrency(service.price)}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-gold-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration} min</span>
                  </div>
                  <Link href={`/reservar?service=${service.id}`}>
                    <button className="flex items-center gap-1 text-gold-500 hover:text-gold-400 text-xs font-medium transition-colors">
                      Reservar <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/reservar">
            <Button size="lg" className="text-base">
              Ver disponibilidad y reservar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
