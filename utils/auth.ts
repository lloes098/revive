// Supabase 인증 관련 유틸리티 함수들
import { createClient } from '@/lib/supabase-client'

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
const supabase = createClient()

export interface AuthResult {
  accessToken: string
  user: {
    id: string
    email: string
    name?: string
  }
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) return null

    // 사용자 프로필 정보 가져오기 (profiles 테이블에서)
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', session.user.id)
      .single()

    return {
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: profile?.name || undefined
      },
      accessToken: session.access_token
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// 로그아웃
export async function signOut() {
  try {
    await supabase.auth.signOut()
    window.location.href = '/'
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// 회원가입
export async function signUp(email: string, password: string, name: string): Promise<AuthResult> {
  try {
    // 1. 사용자 회원가입
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error('회원가입에 실패했습니다')
    }

    // 2. 세션이 있으면 바로 로그인된 상태 (이메일 확인 비활성화)
    // 세션이 없으면 이메일 확인이 필요한 상태
    if (authData.session) {
      // 프로필 정보 저장 (profiles 테이블에)
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: name,
          email: email,
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // 프로필 생성 실패해도 계정은 생성되었으므로 계속 진행
      }

      return {
        accessToken: authData.session.access_token,
        user: {
          id: authData.user.id,
          email: authData.user.email || email,
          name: name
        }
      }
    } else {
      // 이메일 확인이 필요한 경우
      // 프로필은 트리거가 자동으로 생성하므로 여기서는 에러를 던지지 않고
      // 사용자에게 이메일 확인 안내
      throw new Error('이메일 확인이 필요합니다. 이메일을 확인해주세요.')
    }
  } catch (error: any) {
    console.error('Sign up error:', error)
    throw error
  }
}

// 로그인
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw authError

    if (!authData.user || !authData.session) {
      throw new Error('로그인에 실패했습니다')
    }

    // 프로필 정보 가져오기
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', authData.user.id)
      .single()

    return {
      accessToken: authData.session.access_token,
      user: {
        id: authData.user.id,
        email: authData.user.email || email,
        name: profile?.name || undefined
      }
    }
  } catch (error: any) {
    console.error('Sign in error:', error)
    throw error
  }
}

// Google 로그인
export async function signInWithGoogle(): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) throw error
  } catch (error: any) {
    console.error('Google sign in error:', error)
    throw error
  }
}

// 사용자 프로필 업데이트
export async function updateProfile(userId: string, name: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('id', userId)

    if (error) throw error
  } catch (error: any) {
    console.error('Update profile error:', error)
    throw error
  }
}
