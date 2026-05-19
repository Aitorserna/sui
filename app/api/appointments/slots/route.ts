export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'
import { generateTimeSlots } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const barber_id = searchParams.get('barber_id')

  if (!date || !barber_id) return NextResponse.json({ slots: [] })

  const dateObj = new Date(date)
  const isSaturday = dateObj.getDay() === 6
  const endHour = isSaturday ? 18 : 20
  const allSlots = generateTimeSlots(9, endHour, 30)

  const now = new Date()
  const isToday = date === now.toISOString().split('T')[0]

  if (isDemoMode()) {
    // In demo mode, mark a few slots as taken for realism
    const takenDemo = new Set(['10:00', '11:30', '13:00'])
    const slots = allSlots.map((time) => {
      let available = !takenDemo.has(time)
      if (isToday && available) {
        const [h, m] = time.split(':').map(Number)
        if (h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 60) available = false
      }
      return { time, available }
    })
    return NextResponse.json({ slots })
  }

  try {
    const db = createServerSupabase()
    const { data: booked } = await db
      .from('appointments')
      .select('time')
      .eq('barber_id', barber_id)
      .eq('date', date)
      .neq('status', 'cancelled')

    const bookedTimes = new Set((booked || []).map((a) => a.time.slice(0, 5)))
    const slots = allSlots.map((time) => {
      let available = !bookedTimes.has(time)
      if (isToday && available) {
        const [h, m] = time.split(':').map(Number)
        if (h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 60) available = false
      }
      return { time, available }
    })
    return NextResponse.json({ slots })
  } catch {
    return NextResponse.json({ slots: [] })
  }
}
