import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // OAuth 코드를 세션으로 교환
    await supabase.auth.exchangeCodeForSession(code)
  }

  // OAuth 콜백 후 마이페이지로 리다이렉트
  return NextResponse.redirect(new URL('/my', requestUrl.origin))
}

