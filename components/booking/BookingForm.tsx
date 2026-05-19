'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { BookingFormData } from '@/lib/types'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
}

export default function BookingForm({ register, errors }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Nombre completo *
          </label>
          <input
            {...register('client_name', { required: 'El nombre es obligatorio' })}
            className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-white/20"
            placeholder="Tu nombre"
          />
          {errors.client_name && (
            <p className="text-red-400 text-xs mt-1">{errors.client_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Teléfono
          </label>
          <input
            {...register('client_phone')}
            className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-white/20"
            placeholder="+34 600 000 000"
            type="tel"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Email *
        </label>
        <input
          {...register('client_email', {
            required: 'El email es obligatorio',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido' },
          })}
          className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-white/20"
          placeholder="tu@email.com"
          type="email"
        />
        {errors.client_email && (
          <p className="text-red-400 text-xs mt-1">{errors.client_email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Notas adicionales
        </label>
        <textarea
          {...register('notes')}
          className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-white/20 resize-none"
          placeholder="Preferencias, alergias, detalles del corte..."
          rows={3}
        />
      </div>
    </div>
  )
}
