export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode } from '@/lib/demo-data'
import { createServerSupabase } from '@/lib/supabase'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (isDemoMode()) {
    return NextResponse.json({
      today_appointments: 3,
      today_revenue: 10000,
      month_revenue: 187500,
      total_clients: 4,
      pending_appointments: 1,
    })
  }

  const db = createServerSupabase()
  const today = new Date().toISOString().split('T')[0]
  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

  const [todayRes, monthRes, clientsRes, pendingRes] = await Promise.all([
    db.from('appointments').select('id, service_id').eq('date', today).neq('status', 'cancelled'),
    db.from('appointments').select('id, service_id').gte('date', firstOfMonth).eq('payment_status', 'paid'),
    db.from('clients').select('id', { count: 'exact', head: true }),
    db.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  const todayServiceIds = (todayRes.data || []).map((a) => a.service_id)
  const monthServiceIds = (monthRes.data || []).map((a) => a.service_id)

  let todayRevenue = 0
  let monthRevenue = 0

  if (todayServiceIds.length > 0) {
    const { data: svc } = await db.from('services').select('id, price').in('id', todayServiceIds)
    const priceMap = Object.fromEntries((svc || []).map((s) => [s.id, s.price]))
    todayRevenue = todayServiceIds.reduce((sum, id) => sum + (priceMap[id] || 0), 0)
  }

  if (monthServiceIds.length > 0) {
    const { data: svc } = await db.from('services').select('id, price').in('id', monthServiceIds)
    const priceMap = Object.fromEntries((svc || []).map((s) => [s.id, s.price]))
    monthRevenue = monthServiceIds.reduce((sum, id) => sum + (priceMap[id] || 0), 0)
  }

  return NextResponse.json({
    today_appointments: todayRes.data?.length || 0,
    today_revenue: todayRevenue,
    month_revenue: monthRevenue,
    total_clients: clientsRes.count || 0,
    pending_appointments: pendingRes.count || 0,
  })
}
