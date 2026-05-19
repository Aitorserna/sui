import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Carlos M.', text: 'El fade más limpio que me han hecho. Marcos es un artista. Los 3€ de señal son lo más cómodo del mundo.', rating: 5, service: 'Fade' },
  { name: 'Javier R.', text: 'Reservé en 2 minutos y Marcos confirmó en media hora. Vine, me hice el corte con barba y salí como nuevo.', rating: 5, service: 'Corte + Barba' },
  { name: 'David L.', text: 'Me hizo las cejas por primera vez en mi vida y quedé flipando. Ya no voy a ningún otro sitio.', rating: 5, service: 'Corte + Cejas' },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">El Público Habla</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase mb-4">
            Los que ya <span className="text-gold-500">ganaron</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-zinc-900 border border-white/10 hover:border-gold-500/30 rounded-xl p-6 transition-all relative">
              {/* Quote mark boxing style */}
              <div className="absolute top-4 right-4 text-4xl text-gold-500/10 font-black leading-none">"</div>

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white font-black text-sm uppercase">{t.name}</p>
                  <p className="text-gold-500 text-xs">{t.service}</p>
                </div>
                <div className="w-8 h-8 rounded bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                  <span className="text-gold-500 text-xs font-black">{t.name[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
