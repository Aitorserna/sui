import Link from 'next/link'
import { CheckCircle, Clock } from 'lucide-react'

const specialties = ['Fade', 'Corte Clásico', 'Arreglo de Barba', 'Cejas', 'Cuidado Capilar', 'Peinado Masculino']
const notAvailable = ['Tintes', 'Permanentes']

export default function Team() {
  return (
    <section id="barbero" className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">El Campeón</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase mb-4">
            Marcos <span className="text-gold-500">Martínez</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar / boxing poster style */}
          <div className="relative">
            <div className="aspect-square max-w-sm mx-auto bg-zinc-900 rounded-2xl border-2 border-gold-500/30 flex flex-col items-center justify-center overflow-hidden">
              {/* Vintage boxing poster bg */}
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9193A 0, #C9193A 2px, transparent 0, transparent 30px)' }}
              />
              <div className="relative text-center p-8">
                <div className="text-8xl mb-4">🥊</div>
                <p className="text-gold-500 font-black text-2xl uppercase tracking-widest">Marcos</p>
                <p className="text-white/60 text-sm uppercase tracking-widest">Martínez</p>
                <div className="mt-4 px-4 py-1 border border-gold-500/40 inline-block">
                  <span className="text-gold-500 text-xs uppercase tracking-widest font-bold">Le Barber</span>
                </div>
              </div>
            </div>
            {/* Boxing corner decoration */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold-500" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold-500" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold-500" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold-500" />
          </div>

          {/* Info */}
          <div>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Barbero profesional con dominio total de los estilos más demandados.
              Cada cliente es un proyecto único — por eso Marcos revisa personalmente
              cada reserva antes de confirmarla.
            </p>

            {/* What he does */}
            <div className="mb-6">
              <h3 className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">✓ Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-gold-500/10 text-gold-300 border border-gold-500/20 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> {s}
                  </span>
                ))}
              </div>
            </div>

            {/* What he doesn't do */}
            <div className="mb-8">
              <h3 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-3">✕ No disponible</h3>
              <div className="flex flex-wrap gap-2">
                {notAvailable.map((s) => (
                  <span key={s} className="text-sm px-3 py-1.5 bg-white/5 text-white/30 border border-white/10 rounded-full line-through">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability notice */}
            <div className="bg-zinc-900 border border-gold-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold text-sm mb-1">Disponibilidad variable</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    El horario de Marcos varía cada semana. Reserva tu hora preferida y él confirmará
                    en menos de 24h si puede atenderte. Si no puede, te avisamos y devolvemos la señal.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/reservar">
              <button className="w-full bg-gold-500 hover:bg-gold-400 text-black font-black uppercase tracking-widest py-4 rounded transition-colors">
                Reservar con Marcos — 3€ señal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
