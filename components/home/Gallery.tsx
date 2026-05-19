const items = [
  { label: 'Fade Perfecto', cat: 'Degradado' },
  { label: 'Barba Definida', cat: 'Barba' },
  { label: 'Corte Clásico', cat: 'Tijeras' },
  { label: 'Cejas Perfiladas', cat: 'Cejas' },
  { label: 'Peinado Moderno', cat: 'Estilo' },
  { label: 'Cuidado Capilar', cat: 'Tratamiento' },
]

const bgs = [
  'from-red-950/60 to-zinc-950',
  'from-zinc-800/60 to-zinc-950',
  'from-red-900/40 to-black',
  'from-zinc-700/40 to-zinc-950',
  'from-red-950/40 to-black',
  'from-zinc-800/30 to-zinc-950',
]

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">El Trabajo</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase mb-4">
            Galería de <span className="text-gold-500">Combates</span>
          </h2>
          <p className="text-white/40 text-sm">Cada silla es el ring. Cada corte, una victoria.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`group relative aspect-square bg-gradient-to-br ${bgs[i]} rounded-xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-300 cursor-pointer`}>
              {/* Boxing corner marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/40 group-hover:border-gold-500/80 transition-colors" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/40 group-hover:border-gold-500/80 transition-colors" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/40 group-hover:border-gold-500/80 transition-colors" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/40 group-hover:border-gold-500/80 transition-colors" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-7xl">✂</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-black text-sm uppercase tracking-wider">{item.label}</p>
                <p className="text-gold-500 text-xs uppercase tracking-widest">{item.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
