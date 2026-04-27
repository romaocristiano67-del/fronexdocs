import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next')
  const fallbackPath = '/dashboard'
  const redirectPath = next && next.startsWith('/') ? next : fallbackPath

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
