import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos M.',
    text: 'El mejor corte que me han hecho en años. La atención al detalle es increíble, y el ambiente es de lujo total.',
    rating: 5,
    service: 'Corte Fade',
  },
  {
    name: 'Javier R.',
    text: 'Reservé online en 2 minutos. El asistente IA me recomendó el corte perfecto para mi tipo de rostro. ¡Una experiencia única!',
    rating: 5,
    service: 'Corte + Barba',
  },
  {
    name: 'David L.',
    text: 'Marco es un artista. Llevo 3 años viniendo y nunca me ha decepcionado. La barbería más premium de Madrid sin duda.',
    rating: 5,
    service: 'Afeitado Clásico',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Testimonios</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Lo Que Dicen <span className="text-gold-500">Nuestros Clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-900 border border-white/10 hover:border-gold-500/30 rounded-xl p-6 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gold-500 text-xs">{t.service}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                  <span className="text-gold-500 text-xs font-bold">{t.name[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
