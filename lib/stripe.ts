import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export function getStripeServer(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key === 'your_stripe_secret_key') {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

let stripePromise: ReturnType<typeof loadStripe>

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}
