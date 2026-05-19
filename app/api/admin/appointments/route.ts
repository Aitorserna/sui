export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode, DEMO_APPOINTMENTS } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('x-admin-key')
  return auth === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (isDemoMode()) return NextResponse.json({ appointments: DEMO_APPOINTMENTS })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const date = searchParams.get('date')
  const db = createServerSupabase()

  let query = db
    .from('appointments')
    .select('*, service:services(name,price,duration), barber:barbers(name)')
    .order('date', { ascending: false })
    .order('time', { ascending: true })
    .limit(50)

  if (status) query = query.eq('status', status)
  if (date) query = query.eq('date', date)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ appointments: data })
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id, ...updates } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  if (isDemoMode()) {
    const appt = DEMO_APPOINTMENTS.find((a) => a.id === id)
    return NextResponse.json({ appointment: { ...appt, ...updates } })
  }

  const db = createServerSupabase()
  const { data, error } = await db.from('appointments').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ appointment: data })
}
