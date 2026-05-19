export interface Service {
  id: string
  name: string
  description: string
  duration: number // minutes
  price: number // cents
  category: string
  image_url?: string
  is_active: boolean
  created_at: string
}

export interface Barber {
  id: string
  name: string
  bio: string
  photo_url?: string
  specialties: string[]
  is_active: boolean
}

export interface Appointment {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_id: string
  barber_id: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  payment_status: 'unpaid' | 'paid' | 'refunded'
  stripe_payment_intent_id?: string
  notes?: string
  created_at: string
  service?: Service
  barber?: Barber
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  total_visits: number
  last_visit?: string
  created_at: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingFormData {
  service_id: string
  barber_id: string
  date: string
  time: string
  client_name: string
  client_email: string
  client_phone: string
  notes?: string
}
