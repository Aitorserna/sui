'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#barbero', label: 'El Barbero' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gold-500/30 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center group-hover:bg-gold-400 transition-colors font-black text-white text-lg leading-none">
              LB
            </div>
            <div className="leading-none">
              <span className="text-white font-black text-xl tracking-widest uppercase">Le</span>
              <span className="text-gold-500 font-black text-xl tracking-widest uppercase"> Barber</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-white/60 hover:text-gold-400 text-sm tracking-wider uppercase font-semibold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin">
              <span className="text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors cursor-pointer">Admin</span>
            </Link>
            <Link href="/reservar">
              <Button size="md">Reservar · 3€ señal</Button>
            </Link>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-black/95 border-t border-white/10 py-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-white/70 hover:text-gold-400 text-sm uppercase tracking-wider">
                {l.label}
              </a>
            ))}
            <div className="px-4 pt-4">
              <Link href="/reservar" onClick={() => setOpen(false)}>
                <Button className="w-full" size="lg">Reservar · 3€ señal</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
