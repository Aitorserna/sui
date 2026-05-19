import type { Service, Barber, Appointment, Client } from './types'

export const DEMO_SERVICES: Service[] = [
  { id: '1', name: 'Corte Clásico', description: 'Corte de cabello tradicional con tijeras, acabado impecable y producto de peinado incluido', duration: 45, price: 1200, category: 'Corte', is_active: true, created_at: new Date().toISOString() },
  { id: '2', name: 'Fade', description: 'Degradado preciso a máquina con transición perfecta. El sello de la casa', duration: 60, price: 1200, category: 'Corte', is_active: true, created_at: new Date().toISOString() },
  { id: '3', name: 'Corte + Barba', description: 'Corte de cabello más arreglo y perfilado de barba. El combo más popular', duration: 75, price: 1700, category: 'Combo', is_active: true, created_at: new Date().toISOString() },
  { id: '4', name: 'Corte + Cejas', description: 'Corte de cabello más depilación y perfilado de cejas', duration: 60, price: 1500, category: 'Combo', is_active: true, created_at: new Date().toISOString() },
  { id: '5', name: 'Arreglo de Barba', description: 'Perfilado, arreglo y definición de barba con navaja y aceites', duration: 30, price: 500, category: 'Barba', is_active: true, created_at: new Date().toISOString() },
  { id: '6', name: 'Cejas', description: 'Depilación y perfilado de cejas para un look limpio y definido', duration: 15, price: 300, category: 'Cejas', is_active: true, created_at: new Date().toISOString() },
  { id: '7', name: 'Cuidado Capilar', description: 'Diagnóstico y tratamiento del cuero cabelludo, hidratación y masaje', duration: 60, price: 1200, category: 'Tratamiento', is_active: true, created_at: new Date().toISOString() },
  { id: '8', name: 'Peinado Masculino', description: 'Asesoramiento de estilo y peinado con productos profesionales', duration: 30, price: 1000, category: 'Peinado', is_active: true, created_at: new Date().toISOString() },
]

export const DEMO_BARBERS: Barber[] = [
  {
    id: '1',
    name: 'Marcos Martínez',
    bio: 'Barbero profesional especialista en fades, cortes clásicos, cejas y barbas. También experto en cuidado capilar y peinado masculino. La disponibilidad varía según la semana — tu cita queda confirmada una vez que Marcos la aprueba.',
    specialties: ['Fade', 'Corte Clásico', 'Cejas', 'Barba', 'Cuidado Capilar', 'Peinado Masculino'],
    is_active: true,
  },
]

export const DEMO_APPOINTMENTS: Appointment[] = [
  { id: '1', client_name: 'Carlos M.', client_email: 'carlos@demo.com', client_phone: '+34 600 111 222', service_id: '2', barber_id: '1', date: new Date().toISOString().split('T')[0], time: '10:00', status: 'confirmed', payment_status: 'paid', created_at: new Date().toISOString(), service: DEMO_SERVICES[1], barber: DEMO_BARBERS[0] },
  { id: '2', client_name: 'Javier R.', client_email: 'javier@demo.com', client_phone: '+34 600 333 444', service_id: '3', barber_id: '1', date: new Date().toISOString().split('T')[0], time: '11:30', status: 'pending', payment_status: 'paid', created_at: new Date().toISOString(), service: DEMO_SERVICES[2], barber: DEMO_BARBERS[0] },
  { id: '3', client_name: 'David L.', client_email: 'david@demo.com', client_phone: '+34 600 555 666', service_id: '1', barber_id: '1', date: new Date().toISOString().split('T')[0], time: '13:00', status: 'completed', payment_status: 'paid', created_at: new Date().toISOString(), service: DEMO_SERVICES[0], barber: DEMO_BARBERS[0] },
]

export const DEMO_CLIENTS: Client[] = [
  { id: '1', name: 'Carlos M.', email: 'carlos@demo.com', phone: '+34 600 111 222', total_visits: 12, last_visit: '2026-05-10', created_at: new Date().toISOString() },
  { id: '2', name: 'Javier R.', email: 'javier@demo.com', phone: '+34 600 333 444', total_visits: 7, last_visit: '2026-04-28', created_at: new Date().toISOString() },
  { id: '3', name: 'David L.', email: 'david@demo.com', phone: '+34 600 555 666', total_visits: 23, last_visit: '2026-05-18', created_at: new Date().toISOString() },
  { id: '4', name: 'Marcos T.', email: 'marcos@demo.com', phone: null, total_visits: 3, last_visit: '2026-03-15', created_at: new Date().toISOString() },
]

export function isDemoMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  return !url || url === 'your_supabase_project_url'
}

export const DEPOSIT_AMOUNT = 300 // 3€ in cents
