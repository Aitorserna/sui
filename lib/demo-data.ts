import type { Service, Barber, Appointment, Client } from './types'

export const DEMO_SERVICES: Service[] = [
  { id: '1', name: 'Corte Clásico', description: 'Corte de cabello tradicional con tijeras y navaja para un acabado impecable', duration: 45, price: 2500, category: 'Corte', is_active: true, created_at: new Date().toISOString() },
  { id: '2', name: 'Corte + Barba', description: 'Combinación premium: corte de cabello y arreglo de barba con navaja', duration: 75, price: 4000, category: 'Combo', is_active: true, created_at: new Date().toISOString() },
  { id: '3', name: 'Arreglo de Barba', description: 'Perfilado y arreglo de barba con navaja caliente y aceites esenciales', duration: 30, price: 2000, category: 'Barba', is_active: true, created_at: new Date().toISOString() },
  { id: '4', name: 'Afeitado Clásico', description: 'Afeitado con navaja caliente, toalla de vapor y productos premium', duration: 45, price: 3000, category: 'Barba', is_active: true, created_at: new Date().toISOString() },
  { id: '5', name: 'Corte Fade', description: 'Degradado preciso con máquina para un look moderno y definido', duration: 60, price: 3500, category: 'Corte', is_active: true, created_at: new Date().toISOString() },
  { id: '6', name: 'Tratamiento Capilar', description: 'Hidratación profunda, masaje capilar y productos de alta gama', duration: 60, price: 4500, category: 'Tratamiento', is_active: true, created_at: new Date().toISOString() },
]

export const DEMO_BARBERS: Barber[] = [
  { id: '1', name: 'Marco Reyes', bio: 'Maestro barbero con 15 años de experiencia en técnicas clásicas y modernas', specialties: ['Fade', 'Barba clásica', 'Afeitado con navaja'], is_active: true },
  { id: '2', name: 'Alejandro Silva', bio: 'Especialista en cortes contemporáneos y diseños artísticos', specialties: ['Diseños', 'Fades', 'Cortes modernos'], is_active: true },
  { id: '3', name: 'Carlos Mendez', bio: 'Experto en tratamientos capilares y estilos vintage', specialties: ['Tratamientos', 'Estilos vintage', 'Pompadour'], is_active: true },
]

export const DEMO_APPOINTMENTS: Appointment[] = [
  { id: '1', client_name: 'Carlos M.', client_email: 'carlos@demo.com', client_phone: '+34 600 111 222', service_id: '1', barber_id: '1', date: new Date().toISOString().split('T')[0], time: '10:00', status: 'confirmed', payment_status: 'paid', created_at: new Date().toISOString(), service: DEMO_SERVICES[0], barber: DEMO_BARBERS[0] },
  { id: '2', client_name: 'Javier R.', client_email: 'javier@demo.com', client_phone: '+34 600 333 444', service_id: '2', barber_id: '2', date: new Date().toISOString().split('T')[0], time: '11:30', status: 'pending', payment_status: 'unpaid', created_at: new Date().toISOString(), service: DEMO_SERVICES[1], barber: DEMO_BARBERS[1] },
  { id: '3', client_name: 'David L.', client_email: 'david@demo.com', client_phone: '+34 600 555 666', service_id: '5', barber_id: '3', date: new Date().toISOString().split('T')[0], time: '13:00', status: 'completed', payment_status: 'paid', created_at: new Date().toISOString(), service: DEMO_SERVICES[4], barber: DEMO_BARBERS[2] },
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
