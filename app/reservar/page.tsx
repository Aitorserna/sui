'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Scissors, ArrowLeft, ArrowRight, Check, CreditCard } from 'lucide-react'
import Header from '@/components/layout/Header'
import ServiceSelector from '@/components/booking/ServiceSelector'
import BarberSelector from '@/components/booking/BarberSelector'
import BookingCalendar from '@/components/booking/BookingCalendar'
import BookingForm from '@/components/booking/BookingForm'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Service, Barber, BookingFormData } from '@/lib/types'

const STEPS = ['Servicio', 'Barbero', 'Fecha y Hora', 'Datos', 'Pago']

function BookingContent() {
  const params = useSearchParams()
  const [step, setStep] = useState(0)
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(params.get('service'))
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>()

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then((r) => r.json()),
      fetch('/api/barbers').then((r) => r.json()),
    ]).then(([s, b]) => {
      setServices(s.services || [])
      setBarbers(b.barbers || [])
    })
  }, [])

  // If service was pre-selected, jump to step 1
  useEffect(() => {
    if (params.get('service') && step === 0) setStep(1)
  }, [params, step])

  const service = services.find((s) => s.id === selectedService)
  const barber = barbers.find((b) => b.id === selectedBarber)

  const canNext = () => {
    if (step === 0) return !!selectedService
    if (step === 1) return !!selectedBarber
    if (step === 2) return !!selectedDate && !!selectedTime
    return true
  }

  const onSubmit = async (formData: BookingFormData) => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) return
    setSubmitting(true)
    setError(null)

    try {
      const dateStr = selectedDate.toISOString().split('T')[0]
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service_id: selectedService,
          barber_id: selectedBarber,
          date: dateStr,
          time: selectedTime,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear la cita')

      // Redirect to Stripe checkout
      const payRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_id: data.appointment.id }),
      })

      const payData = await payRes.json()
      if (!payRes.ok) throw new Error(payData.error || 'Error en el pago')

      window.location.href = payData.url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ha ocurrido un error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-black" />
            </div>
            <span className="text-gold-500 font-black tracking-widest uppercase">Le Barber</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase">Reservar Cita</h1>
          <p className="text-white/40 text-sm mt-1">Solo se cobra <span className="text-gold-400 font-bold">3€ de señal</span> — el resto en el local</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-4 h-px bg-white/10" />
          {STEPS.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center gap-2 z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  i < step
                    ? 'bg-gold-500 border-gold-500 text-black'
                    : i === step
                    ? 'bg-black border-gold-500 text-gold-500'
                    : 'bg-black border-white/20 text-white/30'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-gold-500' : 'text-white/30'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 sm:p-8">
          {step === 0 && (
            <div>
              <h2 className="text-white font-semibold text-xl mb-6">Elige tu servicio</h2>
              <ServiceSelector services={services} selected={selectedService} onSelect={setSelectedService} />
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-white font-semibold text-xl mb-6">Elige tu barbero</h2>
              <BarberSelector barbers={barbers} selected={selectedBarber} onSelect={setSelectedBarber} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-white font-semibold text-xl mb-6">Selecciona fecha y hora</h2>
              <BookingCalendar
                barberId={selectedBarber}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-white font-semibold text-xl mb-6">Tus datos</h2>
              <BookingForm register={register} errors={errors} />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-white font-black text-xl uppercase mb-6">Resumen y señal</h2>
              <div className="bg-black/50 rounded-xl border border-white/10 p-5 space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Servicio</span>
                  <span className="text-white font-medium">{service?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Barbero</span>
                  <span className="text-white font-medium">{barber?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Fecha</span>
                  <span className="text-white font-medium">{selectedDate ? formatDate(selectedDate.toISOString()) : ''}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Hora</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Duración aprox.</span>
                  <span className="text-white font-medium">{service?.duration} min</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                  <span className="text-white/50">Precio del servicio</span>
                  <span className="text-white/70">{service ? formatCurrency(service.price) : ''} <span className="text-white/30">(se paga en el local)</span></span>
                </div>
                <div className="flex justify-between border-t border-gold-500/30 pt-3">
                  <span className="text-gold-500 font-black uppercase tracking-wider">Señal ahora</span>
                  <span className="text-gold-500 font-black text-2xl">3,00 €</span>
                </div>
              </div>

              <div className="bg-gold-500/5 border border-gold-500/20 rounded-lg px-4 py-3 mb-4 text-sm text-white/60 leading-relaxed">
                🥊 Marcos revisará tu solicitud y confirmará la cita en menos de 24h.
                Si no puede atenderte, <span className="text-gold-400">te devolvemos los 3€</span> automáticamente.
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <Button onClick={handleSubmit(onSubmit)} loading={submitting} size="lg" className="w-full text-base font-black uppercase tracking-wider">
                <CreditCard className="w-5 h-5" />
                Pagar señal · 3€
              </Button>

              <p className="text-white/20 text-xs text-center mt-4">
                Pago seguro por Stripe. El resto se abona el día de la cita en el local.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          {step < STEPS.length - 1 && (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-black pt-24 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>}>
        <BookingContent />
      </Suspense>
    </>
  )
}
