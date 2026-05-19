export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode, DEMO_CLIENTS } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (isDemoMode()) return NextResponse.json({ clients: DEMO_CLIENTS })
  const db = createServerSupabase()
  const { data } = await db.from('clients').select('*').order('total_visits', { ascending: false })
  return NextResponse.json({ clients: data || [] })
}
