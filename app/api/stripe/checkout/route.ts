export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { appointment_id } = await req.json()

    if (!appointment_id) {
      return NextResponse.json({ error: 'ID de cita requerido' }, { status: 400 })
    }

    const db = createServerSupabase()
    const { data: appointment, error } = await db
      .from('appointments')
      .select('*, service:services(*)')
      .eq('id', appointment_id)
      .single()

    if (error || !appointment) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }

    const stripe = getStripeServer()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const service = appointment.service as { name: string; price: number }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: service.name,
              description: `${appointment.date} a las ${appointment.time} - ${appointment.client_name}`,
              images: ['https://placehold.co/400x300/1a1a1a/C9A84C?text=Noir+Barber'],
            },
            unit_amount: service.price,
          },
          quantity: 1,
        },
      ],
      customer_email: appointment.client_email,
      metadata: { appointment_id },
      success_url: `${appUrl}/reservar/confirmacion?appointment_id=${appointment_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/reservar?cancelled=1`,
    })

    await db
      .from('appointments')
      .update({ stripe_payment_intent_id: session.payment_intent as string })
      .eq('id', appointment_id)

    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al crear el pago'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
