export default function Gallery() {
  const items = [
    { label: 'Fade Clásico', category: 'Corte' },
    { label: 'Barba Perfilada', category: 'Barba' },
    { label: 'Pompadour', category: 'Estilo' },
    { label: 'Undercut', category: 'Corte' },
    { label: 'Afeitado Navaja', category: 'Barba' },
    { label: 'Tratamiento', category: 'Cuidado' },
  ]

  const gradients = [
    'from-zinc-800 to-zinc-900',
    'from-gold-900/40 to-zinc-900',
    'from-zinc-700 to-zinc-900',
    'from-gold-800/30 to-black',
    'from-zinc-800 to-black',
    'from-gold-900/20 to-zinc-900',
  ]

  return (
    <section id="galeria" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Galería</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nuestro <span className="text-gold-500">Trabajo</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Cada cliente es un lienzo. Cada corte, una obra de arte.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative aspect-square bg-gradient-to-br ${gradients[i]} rounded-xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-300 cursor-pointer`}
            >
              {/* Decorative scissors icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="text-6xl text-gold-500">✂</div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">{item.label}</p>
                  <span className="text-gold-400 text-sm">{item.category}</span>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white/80 text-sm font-medium">{item.label}</p>
                <p className="text-gold-500 text-xs">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
