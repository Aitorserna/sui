'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Carlos M.',  text: 'El fade más limpio que me han hecho en mi vida. Marcos es un artista y los 3€ de señal son lo más cómodo del mundo.', rating: 5, service: 'Fade',          initial: 'C' },
  { name: 'Javier R.',  text: 'Reservé en 2 minutos, Marcos confirmó en media hora. Vine, me hice el corte con barba y salí como nuevo. 100% recomendado.', rating: 5, service: 'Corte + Barba', initial: 'J' },
  { name: 'David L.',   text: 'Me hizo las cejas por primera vez y quedé flipando. Ya no voy a ningún otro sitio. El detalle y la precisión son increíbles.', rating: 5, service: 'Corte + Cejas', initial: 'D' },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-black relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full opacity-5 blob-1"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">Testimonios</span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white uppercase leading-none">
            Los que ya <span className="text-gold-500">ganaron</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.06), transparent 70%)' }} />

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold-500 fill-gold-500" />
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6 italic relative">"{t.text}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-wider">{t.name}</p>
                  <p className="text-gold-500 text-xs mt-0.5">{t.service}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/20 flex items-center justify-center">
                  <span className="text-gold-400 font-black text-sm">{t.initial}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Average rating */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-12 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />)}
          <span className="text-white/40 text-sm ml-2">5.0 · Valoración perfecta</span>
        </motion.div>
      </div>
    </section>
  )
}
