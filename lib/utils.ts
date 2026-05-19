import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateTimeSlots(start = 9, end = 20, interval = 30): string[] {
  const slots: string[] = []
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += interval) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`)
    }
  }
  return slots
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}
