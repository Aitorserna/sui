import { Scissors } from 'lucide-react'

const barbers = [
  {
    name: 'Marco Reyes',
    role: 'Maestro Barbero',
    bio: '15 años perfeccionando el arte de la barbería clásica y moderna.',
    specialties: ['Fade', 'Barba clásica', 'Afeitado con navaja'],
    gradient: 'from-gold-900/50 to-black',
  },
  {
    name: 'Alejandro Silva',
    role: 'Especialista en Diseño',
    bio: 'Transforma tu imagen con cortes contemporáneos y diseños únicos.',
    specialties: ['Diseños artísticos', 'Fades', 'Cortes modernos'],
    gradient: 'from-zinc-800/50 to-black',
  },
  {
    name: 'Carlos Mendez',
    role: 'Experto en Tratamientos',
    bio: 'El cuidado del cabello y la barba llevados al siguiente nivel.',
    specialties: ['Tratamientos', 'Estilos vintage', 'Pompadour'],
    gradient: 'from-gold-900/30 to-black',
  },
]

export default function Team() {
  return (
    <section id="barberos" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Nuestro Equipo</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Los <span className="text-gold-500">Maestros</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Artesanos del cabello con años de experiencia y pasión por el detalle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div
              key={barber.name}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className={`h-64 bg-gradient-to-b ${barber.gradient} flex items-end justify-center pb-6`}>
                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-gold-500/30 flex items-center justify-center">
                  <Scissors className="w-10 h-10 text-gold-500" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-1 group-hover:text-gold-400 transition-colors">
                  {barber.name}
                </h3>
                <p className="text-gold-500 text-sm font-medium mb-3">{barber.role}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{barber.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
