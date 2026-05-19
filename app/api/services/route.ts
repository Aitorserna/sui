export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isDemoMode, DEMO_SERVICES } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

export async function GET() {
  if (isDemoMode()) return NextResponse.json({ services: DEMO_SERVICES })
  try {
    const db = createServerSupabase()
    const { data, error } = await db.from('services').select('*').eq('is_active', true).order('category').order('price')
    if (error) throw error
    return NextResponse.json({ services: data })
  } catch {
    return NextResponse.json({ services: DEMO_SERVICES })
  }
}
