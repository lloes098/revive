'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthModal } from '@/components/AuthModal'
import { getCurrentUser, signOut, updateProfile } from '@/utils/auth'

interface UserData {
  id: string
  email: string
  name?: string
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser.user)
        setEditedName(currentUser.user.name || '')
      } else {
        // 로그인되지 않은 경우 모달 표시
        setShowAuthModal(true)
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  const handleAuthSuccess = (accessToken: string, userData: UserData) => {
    setUser(userData)
    setEditedName(userData.name || '')
    setShowAuthModal(false)
    setMessage({ type: 'success', text: `환영합니다, ${userData.name || '사용자'}님!` })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleLogout = () => {
    signOut()
    setMessage({ type: 'success', text: '로그아웃되었습니다' })
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      setMessage({ type: 'error', text: '이름을 입력해주세요' })
      return
    }

    if (!user) return

    try {
      await updateProfile(user.id, editedName)
      const updatedUser = { ...user, name: editedName }
      setUser(updatedUser)
      setIsEditing(false)
      setMessage({ type: 'success', text: '프로필이 업데이트되었습니다' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '프로필 업데이트에 실패했습니다' })
    }
  }

  const handleCancelEdit = () => {
    setEditedName(user?.name || '')
    setIsEditing(false)
    setMessage(null)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[#6B6B6B]">로딩 중...</div>
      </div>
    )
  }

  // 로그인되지 않은 경우
  if (!user && !isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F5F4EF]">
        {showAuthModal && (
          <AuthModal
            onClose={() => {
              setShowAuthModal(false)
              router.push('/')
            }}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F4EF]">
      <div className="flex-1 px-4 py-6 pb-24">
        {/* 메시지 알림 */}
        {message && (
          <div className={`mb-4 p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* 프로필 섹션 */}
        <Card className="mb-4 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#849973] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-[#849973] hover:bg-[#849973]/90"
                    >
                      저장
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex-1"
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-[#3B3B3B] mb-1">
                    {user?.name || '사용자'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66667 3.33333C2.66667 2.59695 3.26362 2 4 2H12C12.7364 2 13.3333 2.59695 13.3333 3.33333V12.6667C13.3333 13.403 12.7364 14 12 14H4C3.26362 14 2.66667 13.403 2.66667 12.6667V3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.66667 5.33333H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{user?.email || ''}</span>
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="ghost"
                    size="sm"
                    className="text-[#849973] hover:text-[#849973]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M11.3333 2.00001C11.5084 1.8249 11.7163 1.68601 11.9447 1.5913C12.1731 1.49659 12.4173 1.44775 12.6667 1.44775C12.916 1.44775 13.1602 1.49659 13.3886 1.5913C13.617 1.68601 13.8249 1.8249 14 2.00001C14.1751 2.17512 14.314 2.38304 14.4087 2.61144C14.5034 2.83984 14.5522 3.08405 14.5522 3.33334C14.5522 3.58263 14.5034 3.82684 14.4087 4.05524C14.314 4.28364 14.1751 4.49156 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    프로필 수정
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F4EF] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#6B6B6B]">포인트</div>
                <div className="text-lg font-semibold text-[#3B3B3B]">1,250</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F4EF] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 6V10L13 11" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#6B6B6B]">탄소 절감량</div>
                <div className="text-lg font-semibold text-[#3B3B3B]">12.5kg</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 메뉴 리스트 */}
        <Card className="mb-4">
          <div className="divide-y divide-[#E8E7E2]">
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#F5F4EF] transition-colors">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.3667 3.84167C17.6775 4.10833 17.975 4.39167 18.2583 4.69167C18.55 5 18.8167 5.325 19.0583 5.66667C19.3 6.00833 19.5083 6.36667 19.6833 6.74167C19.8583 7.11667 20 7.5 20 7.89167V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H12.1083C12.5 0 12.8833 0.141667 13.2583 0.316667C13.6333 0.491667 13.9917 0.7 14.3333 0.941667C14.675 1.18333 15 1.45 15.3083 1.74167C15.6083 2.025 15.8917 2.3225 16.1583 2.63333L17.3667 3.84167Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 10L15 15M15 10L10 15" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#3B3B3B]">찜한 상품</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#F5F4EF] transition-colors">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#3B3B3B]">내 활동 내역</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#F5F4EF] transition-colors">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 2.5V5M10 15V17.5M17.5 10H15M5 10H2.5M15.6066 4.39337L13.8891 6.11087M6.11087 13.8891L4.39337 15.6066M15.6066 15.6066L13.8891 13.8891M6.11087 6.11087L4.39337 4.39337" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#3B3B3B]">설정</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </Card>

        {/* 로그아웃 버튼 */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-[#E8E7E2] text-[#6B6B6B] hover:bg-[#F5F4EF]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 11.3333L14 8.33333L11 5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8.33333H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          로그아웃
        </Button>
      </div>
    </div>
  )
}
