export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isDemoMode, DEMO_BARBERS } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

export async function GET() {
  if (isDemoMode()) return NextResponse.json({ barbers: DEMO_BARBERS })
  try {
    const db = createServerSupabase()
    const { data, error } = await db.from('barbers').select('*').eq('is_active', true).order('name')
    if (error) throw error
    return NextResponse.json({ barbers: data })
  } catch {
    return NextResponse.json({ barbers: DEMO_BARBERS })
  }
}
