'use client'

import { Clock, Check } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
  selected: string | null
  onSelect: (id: string) => void
}

export default function ServiceSelector({ services, selected, onSelect }: Props) {
  const categories = [...new Set(services.map((s) => s.category))]

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">{cat}</h3>
          <div className="space-y-2">
            {services.filter((s) => s.category === cat).map((service) => (
              <button
                key={service.id}
                onClick={() => onSelect(service.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selected === service.id
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-white/10 bg-zinc-900/50 hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{service.name}</span>
                      {selected === service.id && (
                        <Check className="w-4 h-4 text-gold-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-1 text-white/30 text-xs mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                  <span className="text-gold-400 font-bold text-sm shrink-0">
                    {formatCurrency(service.price)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
