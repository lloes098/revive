'use client'

import { useState, useEffect } from 'react'
import styles from './GroupJoinModal.module.css'

interface GroupJoinModalProps {
  isOpen: boolean
  onClose: () => void
  groupName: string
  memberCount: number
  onJoin: () => void
}

export default function GroupJoinModal({
  isOpen,
  onClose,
  groupName,
  memberCount,
  onJoin,
}: GroupJoinModalProps) {
  const [isJoining, setIsJoining] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleJoin = async () => {
    setIsJoining(true)
    // 가입 로직 처리
    setTimeout(() => {
      setIsJoining(false)
      onJoin()
      onClose()
    }, 1000)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>그룹 가입</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.groupInfo}>
            <div className={styles.groupIcon}>
              <div className={styles.iconPlaceholder} />
            </div>
            <h3 className={styles.groupName}>{groupName}</h3>
            <p className={styles.memberCount}>멤버 {memberCount.toLocaleString()}명</p>
          </div>

          <div className={styles.description}>
            <p className={styles.descriptionText}>
              <strong>{groupName}</strong> 그룹에 가입하시겠어요?
            </p>
            <p className={styles.descriptionSubtext}>
              가입 후 그룹의 게시글을 확인하고,<br />
              같은 관심사를 가진 멤버들과 소통할 수 있습니다.
            </p>
          </div>

          <div className={styles.benefits}>
            <h4 className={styles.benefitsTitle}>가입 혜택</h4>
            <ul className={styles.benefitsList}>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="#849973"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>그룹 전용 게시글 및 토론 참여</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="#849973"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>관심사 기반 맞춤 콘텐츠 추천</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="#849973"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>멤버들과의 실시간 소통</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="#849973"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>그룹 이벤트 및 프로젝트 참여</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.joinButton}
            onClick={handleJoin}
            disabled={isJoining}
          >
            {isJoining ? '가입 중...' : '가입하기'}
          </button>
        </div>
      </div>
    </div>
  )
}

