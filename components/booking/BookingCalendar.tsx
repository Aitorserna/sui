'use client'

import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import type { TimeSlot } from '@/lib/types'

interface Props {
  barberId: string | null
  selectedDate: Date | null
  selectedTime: string | null
  onDateSelect: (date: Date) => void
  onTimeSelect: (time: string) => void
}

export default function BookingCalendar({ barberId, selectedDate, selectedTime, onDateSelect, onTimeSelect }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)

  useEffect(() => {
    if (!selectedDate || !barberId) return
    setLoadingSlots(true)
    const dateStr = selectedDate.toISOString().split('T')[0]
    fetch(`/api/appointments/slots?date=${dateStr}&barber_id=${barberId}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, barberId])

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl border border-white/10 p-4 overflow-x-auto">
        <style>{`
          .rdp { --rdp-accent-color: #C9A84C; --rdp-background-color: rgba(201,168,76,0.15); color: white; }
          .rdp-day_selected, .rdp-day_selected:hover { background-color: #C9A84C !important; color: black !important; font-weight: bold; }
          .rdp-day:hover:not([disabled]) { background-color: rgba(201,168,76,0.2); }
          .rdp-caption_label { color: white; font-weight: 600; }
          .rdp-head_cell { color: rgba(255,255,255,0.4); font-size: 12px; }
          .rdp-day[disabled] { color: rgba(255,255,255,0.2) !important; }
          .rdp-nav_button { color: rgba(255,255,255,0.6); }
          .rdp-day_today { color: #C9A84C; font-weight: 700; }
        `}</style>
        <DayPicker
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={(d) => d && onDateSelect(d)}
          disabled={[
            { before: today },
            { after: maxDate },
            { dayOfWeek: [0] }, // Sunday
          ]}
          locale={es}
          showOutsideDays={false}
        />
      </div>

      {selectedDate && (
        <div>
          <h4 className="text-white/70 text-sm font-medium mb-3">Horarios disponibles</h4>
          {!barberId && (
            <p className="text-white/30 text-sm">Selecciona un barbero primero</p>
          )}
          {barberId && loadingSlots && (
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <div className="w-4 h-4 border-2 border-gold-500/50 border-t-transparent rounded-full animate-spin" />
              Cargando horarios...
            </div>
          )}
          {barberId && !loadingSlots && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => onTimeSelect(slot.time)}
                  className={`py-2 px-1 rounded text-xs font-medium border transition-all ${
                    selectedTime === slot.time
                      ? 'bg-gold-500 border-gold-500 text-black'
                      : slot.available
                      ? 'bg-zinc-800 border-white/10 text-white/70 hover:border-gold-500/50 hover:text-white'
                      : 'bg-zinc-900 border-white/5 text-white/20 cursor-not-allowed line-through'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
              {slots.length === 0 && (
                <p className="col-span-5 text-white/30 text-sm py-4">No hay horarios disponibles</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
