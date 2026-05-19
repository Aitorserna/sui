import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noir Barber — Barbería Premium Madrid',
  description: 'Barbería premium en Madrid. Reserva tu cita online con nuestros maestros barberos. Cortes clásicos, fades, arreglo de barba y tratamientos capilares.',
  keywords: 'barbería, barbería premium, Madrid, corte de pelo, barba, fade',
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
