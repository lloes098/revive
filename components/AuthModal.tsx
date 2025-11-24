'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { signUp, signIn } from '@/utils/auth'

interface AuthModalProps {
  onClose: () => void
  onSuccess: (accessToken: string, user: { id: string; email: string; name?: string }) => void
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('이름을 입력해주세요')
          setIsLoading(false)
          return
        }
        if (password.length < 6) {
          setError('비밀번호는 최소 6자 이상이어야 합니다')
          setIsLoading(false)
          return
        }

        const result = await signUp(email, password, name)
        onSuccess(result.accessToken, result.user)
      } else {
        const { accessToken, user } = await signIn(email, password)
        onSuccess(accessToken, user)
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      const errorMessage = error.message || '오류가 발생했습니다'

      if (errorMessage.includes('Invalid login credentials')) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다')
      } else if (errorMessage.includes('already registered') || errorMessage.includes('User already registered')) {
        setError('이미 등록된 이메일입니다. 로그인해주세요.')
        setMode('login')
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('이메일 인증이 필요합니다')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#3B3B3B] z-10"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-2xl mb-2">♻️</div>
            <h2 className="text-xl text-[#3B3B3B] mb-1">
              {mode === 'login' ? 'REVIVE 로그인' : '회원가입'}
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              {mode === 'login' 
                ? '지속가능한 패션 순환에 동참하세요' 
                : '새로운 순환경제 여정을 시작하세요'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-sm text-[#3B3B3B] mb-1.5 block">이름</label>
                <div className="relative">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                  >
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Input
                    type="text"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-[#3B3B3B] mb-1.5 block">이메일</label>
              <div className="relative">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                >
                  <path d="M2.66667 3.33333C2.66667 2.59695 3.26362 2 4 2H12C12.7364 2 13.3333 2.59695 13.3333 3.33333V12.6667C13.3333 13.403 12.7364 14 12 14H4C3.26362 14 2.66667 13.403 2.66667 12.6667V3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.66667 5.33333H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#3B3B3B] mb-1.5 block">비밀번호</label>
              <div className="relative">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                >
                  <path d="M12 6.66667C12.3682 6.66667 12.6667 6.96514 12.6667 7.33333V11.3333C12.6667 11.7015 12.3682 12 12 12H4C3.63181 12 3.33333 11.7015 3.33333 11.3333V7.33333C3.33333 6.96514 3.63181 6.66667 4 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6.66667V4C8 3.26362 8.59695 2.66667 9.33333 2.66667C10.0697 2.66667 10.6667 3.26362 10.6667 4V6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-[#6B6B6B] mt-1">최소 6자 이상</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#849973] hover:bg-[#849973]/90 text-white"
              disabled={isLoading}
            >
              {isLoading 
                ? '처리중...' 
                : mode === 'login' ? '로그인' : '회원가입'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setPassword('')
                setError(null)
              }}
              className="text-sm text-[#849973] hover:underline"
            >
              {mode === 'login' 
                ? '계정이 없으신가요? 회원가입' 
                : '이미 계정이 있으신가요? 로그인'}
            </button>
          </div>

          {/* Benefits (only show on signup) */}
          {mode === 'signup' && (
            <div className="mt-6 p-4 bg-[#F5F4EF] rounded-lg">
              <p className="text-xs text-[#3B3B3B] mb-2">회원가입 혜택</p>
              <ul className="text-xs text-[#6B6B6B] space-y-1">
                <li>✓ 업사이클링 프로젝트 투표 참여</li>
                <li>✓ 커뮤니티 활동 및 포인트 적립</li>
                <li>✓ 맞춤 빈티지 상품 추천</li>
                <li>✓ 탄소 절감량 추적 및 리워드</li>
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

