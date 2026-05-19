export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service_id, barber_id, date, time, client_name, client_email, client_phone, notes } = body

    if (!service_id || !barber_id || !date || !time || !client_name || !client_email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    if (isDemoMode()) {
      // Return a fake appointment in demo mode
      return NextResponse.json({
        appointment: {
          id: `demo-${Date.now()}`,
          service_id, barber_id, date, time,
          client_name, client_email, client_phone, notes,
          status: 'pending',
          payment_status: 'unpaid',
          created_at: new Date().toISOString(),
        },
        demo: true,
      })
    }

    const db = createServerSupabase()
    const { data: conflict } = await db
      .from('appointments')
      .select('id')
      .eq('barber_id', barber_id)
      .eq('date', date)
      .eq('time', time)
      .neq('status', 'cancelled')
      .single()

    if (conflict) return NextResponse.json({ error: 'Esta hora ya está ocupada' }, { status: 409 })

    const { data, error } = await db
      .from('appointments')
      .insert({ service_id, barber_id, date, time, client_name, client_email, client_phone, notes, status: 'pending', payment_status: 'unpaid' })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ appointment: data })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error al crear la cita' }, { status: 500 })
  }
}
