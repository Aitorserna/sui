export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = createServerSupabase()
  const { data, error } = await db
    .from('appointments')
    .select('*, service:services(*), barber:barbers(name)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ appointment: data })
}
