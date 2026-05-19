export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { generateTimeSlots } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const barber_id = searchParams.get('barber_id')

  if (!date || !barber_id) {
    return NextResponse.json({ slots: [] })
  }

  try {
    const db = createServerSupabase()

    // Get booked times for this barber+date
    const { data: booked } = await db
      .from('appointments')
      .select('time')
      .eq('barber_id', barber_id)
      .eq('date', date)
      .neq('status', 'cancelled')

    const bookedTimes = new Set((booked || []).map((a) => a.time.slice(0, 5)))

    // Saturday ends at 18:00
    const dateObj = new Date(date)
    const isSaturday = dateObj.getDay() === 6
    const endHour = isSaturday ? 18 : 20

    const allSlots = generateTimeSlots(9, endHour, 30)
    const now = new Date()
    const isToday = date === now.toISOString().split('T')[0]

    const slots = allSlots.map((time) => {
      let available = !bookedTimes.has(time)
      // Block past times for today
      if (isToday && available) {
        const [h, m] = time.split(':').map(Number)
        const slotMins = h * 60 + m
        const nowMins = now.getHours() * 60 + now.getMinutes()
        if (slotMins <= nowMins + 60) available = false // 60 min buffer
      }
      return { time, available }
    })

    return NextResponse.json({ slots })
  } catch {
    return NextResponse.json({ slots: [] })
  }
}
