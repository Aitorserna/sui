import Link from 'next/link'
import { Scissors, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-black border-t border-gold-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-widest uppercase">Noir</span>
                <span className="text-gold-500 font-bold text-xl tracking-widest uppercase"> Barber</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              La experiencia de barbería premium que mereces. Arte, precisión y estilo en cada visita.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 rounded-full flex items-center justify-center transition-all text-white/60 hover:text-gold-400 text-sm font-bold">
                IG
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 rounded-full flex items-center justify-center transition-all text-white/60 hover:text-gold-400 text-sm font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-gold-500 font-semibold tracking-widest uppercase text-sm mb-4">Horario</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex justify-between gap-4"><span>Lun - Vie</span><span className="text-white/70">09:00 - 20:00</span></li>
              <li className="flex justify-between gap-4"><span>Sábado</span><span className="text-white/70">09:00 - 18:00</span></li>
              <li className="flex justify-between gap-4"><span>Domingo</span><span className="text-red-400">Cerrado</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-500 font-semibold tracking-widest uppercase text-sm mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span>Calle del Barón, 42<br />Madrid, España</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+34 91 234 56 78</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500" />
                <span>hola@noirbarber.es</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Noir Barber. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/admin" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Panel Admin
            </Link>
            <span className="text-white/30 text-xs">Política de privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
