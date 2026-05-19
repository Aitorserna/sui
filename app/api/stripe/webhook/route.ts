export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const stripe = getStripeServer()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook error'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const db = createServerSupabase()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { appointment_id?: string }, payment_intent?: string | null }
    const appointment_id = session.metadata?.appointment_id

    if (appointment_id) {
      await db
        .from('appointments')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq('id', appointment_id)
    }
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as { payment_intent?: string | null }
    if (charge.payment_intent) {
      await db
        .from('appointments')
        .update({ payment_status: 'refunded' })
        .eq('stripe_payment_intent_id', charge.payment_intent as string)
    }
  }

  return NextResponse.json({ received: true })
}
