export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode, DEMO_APPOINTMENTS, DEMO_SERVICES, DEMO_BARBERS } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (isDemoMode()) {
    // Return a demo appointment or build one from the id
    const found = DEMO_APPOINTMENTS.find((a) => a.id === id)
    if (found) return NextResponse.json({ appointment: found })
    // Build a plausible one for newly created demo appointments
    return NextResponse.json({
      appointment: {
        id,
        client_name: 'Cliente Demo',
        client_email: 'demo@noirbarber.es',
        service_id: '1',
        barber_id: '1',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmed',
        payment_status: 'paid',
        created_at: new Date().toISOString(),
        service: DEMO_SERVICES[0],
        barber: DEMO_BARBERS[0],
      },
    })
  }

  const db = createServerSupabase()
  const { data, error } = await db
    .from('appointments')
    .select('*, service:services(*), barber:barbers(name)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ appointment: data })
}
