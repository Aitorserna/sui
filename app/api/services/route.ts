export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    const db = createServerSupabase()
    const { data, error } = await db
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('price')

    if (error) throw error
    return NextResponse.json({ services: data })
  } catch {
    return NextResponse.json({ services: [] })
  }
}
