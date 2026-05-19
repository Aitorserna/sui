export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode, DEMO_SERVICES } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (isDemoMode()) return NextResponse.json({ services: DEMO_SERVICES })
  const db = createServerSupabase()
  const { data } = await db.from('services').select('*').order('category').order('price')
  return NextResponse.json({ services: data || [] })
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (isDemoMode()) {
    const body = await req.json()
    return NextResponse.json({ service: { id: `demo-${Date.now()}`, ...body, created_at: new Date().toISOString() } })
  }
  const body = await req.json()
  const db = createServerSupabase()
  const { data, error } = await db.from('services').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: data })
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id, ...updates } = await req.json()
  if (isDemoMode()) {
    const svc = DEMO_SERVICES.find((s) => s.id === id)
    return NextResponse.json({ service: { ...svc, ...updates } })
  }
  const db = createServerSupabase()
  const { data, error } = await db.from('services').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: data })
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (isDemoMode()) return NextResponse.json({ ok: true })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const db = createServerSupabase()
  await db.from('services').update({ is_active: false }).eq('id', id!)
  return NextResponse.json({ ok: true })
}
