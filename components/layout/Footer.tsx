import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-black border-t border-gold-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center font-black text-white text-lg">LB</div>
              <div>
                <span className="text-white font-black text-xl tracking-widest uppercase">Le</span>
                <span className="text-gold-500 font-black text-xl tracking-widest uppercase"> Barber</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              El ring donde tu imagen gana el combate. Fades, cortes clásicos, barba, cejas y cuidado capilar con Marcos Martínez.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 rounded flex items-center justify-center transition-all text-white/40 hover:text-gold-400 text-xs font-black">IG</a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 rounded flex items-center justify-center transition-all text-white/40 hover:text-gold-400 text-xs font-black">TK</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-gold-500 font-black tracking-widest uppercase text-xs mb-4">Horario</h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li className="flex justify-between gap-4"><span>Lun - Vie</span><span className="text-white/60">Variable</span></li>
              <li className="flex justify-between gap-4"><span>Sábado</span><span className="text-white/60">Variable</span></li>
              <li className="flex justify-between gap-4"><span>Domingo</span><span className="text-red-400">Cerrado</span></li>
            </ul>
            <p className="text-white/25 text-xs mt-3 leading-relaxed">
              * Disponibilidad confirmada por Marcos al reservar
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-500 font-black tracking-widest uppercase text-xs mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span>Tu dirección aquí</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+34 600 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500" />
                <span>hola@lebarber.es</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Le Barber. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="text-white/20 hover:text-white/50 text-xs transition-colors">Panel Admin</Link>
            <span className="text-white/20 text-xs">Política de privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
