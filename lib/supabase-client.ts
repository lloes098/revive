'use client'

import { createBrowserClient } from '@supabase/ssr'

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 환경 변수가 없을 때 더 명확한 에러 메시지
  if (!supabaseUrl || !supabaseAnonKey) {
    const missing = []
    if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
    if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    
    console.error('❌ Missing Supabase environment variables:', missing.join(', '))
    console.error('📝 Please create .env.local file in the project root with:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    console.error('🔄 Then restart the development server (npm run dev)')
    
    throw new Error(
      `Missing Supabase environment variables: ${missing.join(', ')}. ` +
      'Please check your .env.local file and restart the dev server.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

