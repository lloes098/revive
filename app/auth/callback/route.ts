import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.redirect(new URL('/my', requestUrl.origin))
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    // OAuth 코드를 세션으로 교환
    await supabase.auth.exchangeCodeForSession(code)
  }

  // OAuth 콜백 후 마이페이지로 리다이렉트
  return NextResponse.redirect(new URL('/my', requestUrl.origin))
}

