import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your_supabase_project_url') {
    throw new Error('Supabase not configured')
  }
  return createClient(url, key)
}

export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || url === 'your_supabase_project_url') {
    throw new Error('Supabase not configured')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

// Backwards compat export for client components
export const supabase = {
  get client() {
    return getSupabase()
  },
}
