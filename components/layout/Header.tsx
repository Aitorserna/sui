'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gold-500 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative w-10 h-10 bg-black border border-gold-500/50 rounded-lg flex items-center justify-center">
                <span className="text-gold-500 font-black text-sm tracking-wider">LB</span>
              </div>
            </div>
            <span className="text-white font-black text-lg tracking-widest uppercase">
              Le <span className="text-gold-500">Barber</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="relative text-white/60 hover:text-white text-sm tracking-wider uppercase font-medium transition-colors group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin">
              <span className="text-white/20 hover:text-white/50 text-xs tracking-widest uppercase transition-colors">Admin</span>
            </Link>
            <Link href="/reservar">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black text-sm uppercase tracking-widest"
              >
                <span className="relative z-10">Reservar · 3€</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </motion.button>
            </Link>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-dark rounded-2xl mb-4 overflow-hidden"
            >
              <div className="py-4">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-white/70 hover:text-gold-400 text-sm uppercase tracking-wider transition-colors">
                    {l.label}
                  </a>
                ))}
                <div className="px-6 pt-4">
                  <Link href="/reservar" onClick={() => setOpen(false)}>
                    <button className="w-full py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black font-black text-sm uppercase tracking-widest">
                      Reservar · 3€ señal
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
