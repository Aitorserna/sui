'use client'

export default function DemoBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-gold-500/40 text-white/70 text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
      Modo demo · sin Supabase/Stripe configurados
    </div>
  )
}
