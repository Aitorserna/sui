'use client'

import { Check, Scissors } from 'lucide-react'
import type { Barber } from '@/lib/types'

interface Props {
  barbers: Barber[]
  selected: string | null
  onSelect: (id: string) => void
}

export default function BarberSelector({ barbers, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {barbers.map((barber) => (
        <button
          key={barber.id}
          onClick={() => onSelect(barber.id)}
          className={`p-4 rounded-xl border text-left transition-all ${
            selected === barber.id
              ? 'border-gold-500 bg-gold-500/10'
              : 'border-white/10 bg-zinc-900/50 hover:border-white/30'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative w-16 h-16 rounded-full bg-zinc-800 border-2 border-white/10 flex items-center justify-center mb-3">
              <Scissors className="w-7 h-7 text-gold-500/70" />
              {selected === barber.id && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </div>
              )}
            </div>
            <span className="text-white font-medium text-sm">{barber.name}</span>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {barber.specialties.slice(0, 2).map((s) => (
                <span key={s} className="text-gold-500/60 text-xs">{s}</span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
