export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    const db = createServerSupabase()
    const { data, error } = await db
      .from('barbers')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) throw error
    return NextResponse.json({ barbers: data })
  } catch {
    return NextResponse.json({ barbers: [] })
  }
}
