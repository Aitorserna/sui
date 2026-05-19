import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Le Barber — Fades, Cortes, Barba y Cejas',
  description: 'Reserva tu cita con Marcos Martínez. Fades, cortes clásicos, barba, cejas y cuidado capilar. Solo 3€ de señal para confirmar.',
  keywords: 'barbería, fade, corte clásico, barba, cejas, cuidado capilar, Le Barber',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.className} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
