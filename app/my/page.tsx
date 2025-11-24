'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthModal } from '@/components/AuthModal'
import { getCurrentUser, signOut } from '@/utils/auth'
import styles from './page.module.css'

interface UserData {
  id: string
  email: string
  name?: string
}

type TabType = 'mypage' | 'myshop' | 'feed'

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('mypage')

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser.user)
      } else {
        setShowAuthModal(true)
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  const handleAuthSuccess = (accessToken: string, userData: UserData) => {
    setUser(userData)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    signOut()
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>로딩 중...</div>
      </div>
    )
  }

  if (!user && !isLoading) {
    return (
      <div className={styles.container}>
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

  if (!user) {
    return null
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>MY</h1>
        <button className={styles.settingsButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01129 9.77251C4.28059 9.5799 4.48568 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15H19.32Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 프로필 카드 */}
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              1
            </div>
            <div className={styles.avatarBadge}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L2 4.5V9C2 13.5 5.5 16.5 9 17.5C12.5 16.5 16 13.5 16 9V4.5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5.5V9.5L12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileNameRow}>
              <h2 className={styles.profileName}>빈티지러버</h2>
              <span className={styles.rankBadge}>Gold</span>
            </div>
            <p className={styles.profileDescription}>
              90s 패션과 빈티지 데님을 사랑하는 리셀러입니다 ✨
            </p>
            <div className={styles.followStats}>
              <span>234 팔로워</span>
              <span>89 팔로잉</span>
            </div>
          </div>
        </div>
      </div>

      {/* 획득한 뱃지 */}
      <div className={styles.badgesSection}>
        <div className={styles.badgesHeader}>
          <div className={styles.badgesTitleRow}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L10.545 4.13L14 4.635L11.5 7.07L12.09 10.51L9 8.885L5.91 10.51L6.5 7.07L4 4.635L7.455 4.13L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.badgesTitle}>획득한 뱃지</span>
          </div>
          <span className={styles.badgesCount}>3개</span>
        </div>
        <div className={styles.badgesList}>
          <div className={styles.badgeItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.545 4.13L13 4.635L10.5 7.07L11.09 10.51L8 8.885L4.91 10.51L5.5 7.07L3 4.635L6.455 4.13L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>친환경 챔피언</span>
          </div>
          <div className={styles.badgeItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.545 4.13L13 4.635L10.5 7.07L11.09 10.51L8 8.885L4.91 10.51L5.5 7.07L3 4.635L6.455 4.13L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>90s 마니아</span>
          </div>
          <div className={styles.badgeItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.545 4.13L13 4.635L10.5 7.07L11.09 10.51L8 8.885L4.91 10.51L5.5 7.07L3 4.635L6.455 4.13L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>커뮤니티 리더</span>
          </div>
        </div>
        <div className={styles.badgesProgress}>
          플래티넘 컬렉터까지 550pt 남음
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className={styles.actionButtons}>
        <button 
          className={`${styles.actionButton} ${activeTab === 'mypage' ? styles.actionButtonActive : ''}`}
          onClick={() => setActiveTab('mypage')}
        >
          마이페이지
        </button>
        <button 
          className={`${styles.actionButton} ${activeTab === 'myshop' ? styles.actionButtonActive : ''}`}
          onClick={() => setActiveTab('myshop')}
        >
          마이샵
        </button>
        <button 
          className={`${styles.actionButton} ${activeTab === 'feed' ? styles.actionButtonActive : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          개인 피드
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'mypage' && (
        <div className={styles.environmentSection}>
          <div className={styles.environmentHeader}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L3 6V10C3 14.5 6.5 17.5 10 18.5C13.5 17.5 17 14.5 17 10V6L10 2Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 6V10L13 11" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className={styles.environmentTitle}>나의 환경 보호 효과</h3>
          </div>
          <p className={styles.environmentSubtitle}>
            12번의 구매와 5번의 판매로 만든 변화
          </p>
          <div className={styles.environmentMetrics}>
            <div className={styles.metricCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14L6 18M10 14L14 18M10 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.metricLabel}>탄소 배출</div>
              <div className={styles.metricValue}>156.7</div>
              <div className={styles.metricUnit}>kg 절감</div>
            </div>
            <div className={styles.metricCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.69L5 6L12 9.31L19 6L12 2.69Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 18L12 21.31L19 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12L12 15.31L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2.69V9.31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15.31V21.31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.metricLabel}>물 사용</div>
              <div className={styles.metricValue}>34,500</div>
              <div className={styles.metricUnit}>L 절감</div>
            </div>
            <div className={styles.metricCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8L8 12L12 16L16 12L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.metricLabel}>폐기물</div>
              <div className={styles.metricValue}>18.2</div>
              <div className={styles.metricUnit}>kg 절감</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'myshop' && (
        <div className={styles.shopSection}>
          <div className={styles.shopHeader}>
            <div className={styles.shopTitleRow}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7L10 2L17 7V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V7Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 18V10H13V18" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className={styles.shopTitle}>마이 샵</h3>
            </div>
            <span className={styles.sellerBadge}>판매자</span>
          </div>

          <div className={styles.reliabilitySection}>
            <div className={styles.reliabilityHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L3 6V10C3 14.5 6.5 17.5 10 18.5C13.5 17.5 17 14.5 17 10V6L10 2Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.reliabilityLabel}>판매자 신뢰도</span>
              <span className={styles.reliabilityValue}>95%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '95%' }}></div>
            </div>
          </div>

          <div className={styles.sellerMetrics}>
            <div className={styles.metricItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="#C57B57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.metricContent}>
                <div className={styles.metricValue}>4.8</div>
                <div className={styles.metricLabel}>평점</div>
              </div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricContent}>
                <div className={styles.metricValue}>98%</div>
                <div className={styles.metricLabel}>응답률</div>
              </div>
            </div>
            <div className={styles.metricItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="#C57B57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.metricContent}>
                <div className={styles.metricValue}>4.9</div>
                <div className={styles.metricLabel}>배송 속도</div>
              </div>
            </div>
          </div>

          <div className={styles.shopProductsSection}>
            <h3 className={styles.shopProductsTitle}>판매 중인 상품 (0)</h3>
          </div>
        </div>
      )}

      {activeTab === 'feed' && (
        <>
          {/* 나의 활동 */}
          <div className={styles.activitySection}>
            <div className={styles.activityHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13V17" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 17H13" stroke="#849973" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className={styles.activityTitle}>나의 활동</h3>
            </div>
            <p className={styles.activityDescription}>
              구매 후기, 착용 사진, 매장 방문 후기를 공유하고 커뮤니티와 소통하세요
            </p>
            <div className={styles.activityButtons}>
              <button className={styles.activityButtonPrimary}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                포스트 작성
              </button>
              <button className={styles.activityButtonSecondary}>
                전체 커뮤니티 보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* 내가 작성한 포스트 */}
          <div className={styles.postsSection}>
            <h3 className={styles.postsTitle}>내가 작성한 포스트 (4)</h3>
            <div className={styles.postsList}>
              {/* 포스트 카드 1 */}
              <div className={styles.postCard}>
                <div className={styles.postImage}>
                  <div className={styles.postImagePlaceholder}></div>
                </div>
                <div className={styles.postContent}>
                  <h4 className={styles.postTitle}>Carhartt Work Jacket</h4>
                  <p className={styles.postDescription}>
                    오래 입을수록 멋스러워지는 빈티지 재킷! 품질 너무 좋아요 👍
                  </p>
                  <div className={styles.postEngagement}>
                    <div className={styles.engagementItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 13.3333L6.66667 12.1333C4.66667 10.4 3.33333 9.06667 3.33333 7.33333C3.33333 5.86667 4.53333 4.66667 6 4.66667C6.8 4.66667 7.53333 5.06667 8 5.66667C8.46667 5.06667 9.2 4.66667 10 4.66667C11.4667 4.66667 12.6667 5.86667 12.6667 7.33333C12.6667 9.06667 11.3333 10.4 9.33333 12.1333L8 13.3333Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>124</span>
                    </div>
                    <div className={styles.engagementItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 8C13.3333 10.9455 10.9455 13.3333 8 13.3333C7.33333 13.3333 6.66667 13.2 6.13333 12.9333L2.66667 14L4.06667 10.8C3.6 10.1333 3.33333 9.33333 3.33333 8.46667C3.33333 5.52133 5.38733 3.33333 8 3.33333C10.6127 3.33333 12.6667 5.52133 12.6667 8H13.3333Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>18</span>
                    </div>
                  </div>
                  <div className={styles.postDate}>2025-11-05</div>
                </div>
              </div>

              {/* 포스트 카드 2 - 착용 사진 */}
              <div className={styles.postCard}>
                <div className={styles.postImage}>
                  <div className={styles.postBadge}>착용 사진</div>
                  <div className={styles.postImagePlaceholder}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
