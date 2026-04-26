import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During static build there is no runtime environment yet.
    if (typeof window === 'undefined') {
      return createBrowserClient('https://placeholder.supabase.co', 'placeholder-anon-key')
    }
    throw new Error('Supabase environment variables are missing. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
