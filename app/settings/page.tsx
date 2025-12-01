'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    marketing: false,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = () => {
    // TODO: 로그아웃 로직
    console.log('Logout')
    router.push('/')
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.title}>설정</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* 설정 목록 */}
      <div className={styles.content}>
        {/* 계정 설정 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>계정</h2>
          <div className={styles.menuList}>
            <button className={styles.menuItem}>
              <span>프로필 수정</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className={styles.menuItem}>
              <span>비밀번호 변경</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className={styles.menuItem}>
              <span>연결된 계정</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>알림</h2>
          <div className={styles.menuList}>
            <div className={styles.menuItem}>
              <span>푸시 알림</span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleToggle('push')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            <div className={styles.menuItem}>
              <span>이메일 알림</span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleToggle('email')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            <div className={styles.menuItem}>
              <span>마케팅 알림</span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* 앱 설정 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>앱</h2>
          <div className={styles.menuList}>
            <button className={styles.menuItem}>
              <span>언어 설정</span>
              <div className={styles.menuItemRight}>
                <span className={styles.menuItemValue}>한국어</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#6B6B6B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            <button className={styles.menuItem}>
              <span>다크 모드</span>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </button>
            <button className={styles.menuItem}>
              <span>버전 정보</span>
              <div className={styles.menuItemRight}>
                <span className={styles.menuItemValue}>1.0.0</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#6B6B6B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* 고객지원 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>고객지원</h2>
          <div className={styles.menuList}>
            <button className={styles.menuItem}>
              <span>자주 묻는 질문</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className={styles.menuItem}>
              <span>문의하기</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className={styles.menuItem}>
              <span>이용약관</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className={styles.menuItem}>
              <span>개인정보 처리방침</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B6B6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className={styles.logoutSection}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}

