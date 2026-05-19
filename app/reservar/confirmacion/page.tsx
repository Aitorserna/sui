'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Clock, Scissors, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Appointment } from '@/lib/types'

function ConfirmationContent() {
  const params = useSearchParams()
  const appointmentId = params.get('appointment_id')
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!appointmentId) return
    fetch(`/api/appointments/${appointmentId}`)
      .then((r) => r.json())
      .then((d) => setAppointment(d.appointment))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [appointmentId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-500/50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-gold-500" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">¡Cita Confirmada!</h1>
          <p className="text-white/60">
            Tu reserva ha sido procesada correctamente. Recibirás un email de confirmación.
          </p>
        </div>

        {appointment && (
          <div className="bg-zinc-900 rounded-2xl border border-gold-500/20 p-6 mb-8 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-semibold">{appointment.service?.name}</p>
                <p className="text-gold-500 text-sm">Noir Barber</p>
              </div>
              {appointment.service && (
                <span className="ml-auto text-gold-400 font-bold">
                  {formatCurrency(appointment.service.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span className="text-white/70">{formatDate(appointment.date)}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gold-500" />
              <span className="text-white/70">{appointment.time}</span>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 mt-2">
              <p className="text-green-400 text-sm text-center font-medium">✓ Pago procesado correctamente</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/reservar">
            <Button size="lg" className="w-full">
              Hacer otra reserva
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full">
              Volver al inicio
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
