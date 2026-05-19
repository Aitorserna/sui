export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { isDemoMode, DEPOSIT_AMOUNT } from '@/lib/demo-data'
import { getStripeServer } from '@/lib/stripe'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { appointment_id } = await req.json()
    if (!appointment_id) return NextResponse.json({ error: 'ID de cita requerido' }, { status: 400 })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (isDemoMode()) {
      return NextResponse.json({ url: `${appUrl}/reservar/confirmacion?appointment_id=${appointment_id}&demo=1` })
    }

    const db = createServerSupabase()
    const { data: appointment, error } = await db
      .from('appointments')
      .select('*, service:services(name)')
      .eq('id', appointment_id)
      .single()

    if (error || !appointment) return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })

    const stripe = getStripeServer()
    const service = appointment.service as { name: string }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Señal de reserva — ${service.name}`,
            description: `Cita el ${appointment.date} a las ${appointment.time} con Marcos Martínez. El resto del importe se abona en el local.`,
          },
          unit_amount: DEPOSIT_AMOUNT, // 3€ = 300 cents
        },
        quantity: 1,
      }],
      customer_email: appointment.client_email,
      metadata: { appointment_id },
      success_url: `${appUrl}/reservar/confirmacion?appointment_id=${appointment_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/reservar?cancelled=1`,
    })

    await db.from('appointments').update({ stripe_payment_intent_id: session.payment_intent as string }).eq('id', appointment_id)
    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error al crear el pago' }, { status: 500 })
  }
}
