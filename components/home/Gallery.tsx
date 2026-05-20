'use client'

import { motion } from 'framer-motion'

const items = [
  { label: 'Fade Perfecto',      cat: 'Degradado',  color: '#3b82f6', emoji: '✂️' },
  { label: 'Barba Definida',     cat: 'Barba',       color: '#22c55e', emoji: '🪒' },
  { label: 'Corte Clásico',      cat: 'Tijeras',     color: '#C9A84C', emoji: '💈' },
  { label: 'Cejas Perfiladas',   cat: 'Cejas',       color: '#a855f7', emoji: '✨' },
  { label: 'Peinado Moderno',    cat: 'Estilo',      color: '#06b6d4', emoji: '💪' },
  { label: 'Cuidado Capilar',    cat: 'Tratamiento', color: '#f97316', emoji: '🌿' },
]

export default function Gallery() {
  return (
    <section id="galeria" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">El Trabajo</span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white uppercase leading-none mb-4">
            Galería de <span className="text-gold-500">Looks</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/30 text-sm">Cada silla es el ring. Cada corte, una victoria.</motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: `radial-gradient(circle at 30% 30%, ${item.color}20, #111)` }}
            >
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-opacity-0 transition-all" />
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: `inset 0 0 0 1px ${item.color}50` }}
              />

              {/* Center emoji */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-7xl opacity-20 group-hover:opacity-40 transition-opacity">{item.emoji}</span>
              </motion.div>

              {/* Color accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-black text-sm uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: item.color }}>{item.cat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
