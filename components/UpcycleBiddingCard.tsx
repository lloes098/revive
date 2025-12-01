'use client'

import { useState, useEffect } from 'react'
import { voteForProject, hasUserVoted } from '@/utils/upcycle'
import styles from './UpcycleBiddingCard.module.css'

interface UpcycleBiddingCardProps {
  id: string
  image: string
  brand: string
  title: string
  progress: number
  price: string
  voteCount?: number
  onVoteChange?: () => void
}

export default function UpcycleBiddingCard({
  id,
  image,
  brand,
  title,
  progress,
  price,
  voteCount = 0,
  onVoteChange,
}: UpcycleBiddingCardProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [currentVoteCount, setCurrentVoteCount] = useState(voteCount)
  const [imageError, setImageError] = useState(false)
  
  // 기본 이미지 URL (이미지 로드 실패 시 사용)
  const defaultImage = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
  const imageUrl = image || defaultImage

  useEffect(() => {
    setCurrentVoteCount(voteCount)
  }, [voteCount])

  useEffect(() => {
    checkVoteStatus()
  }, [id])

  const checkVoteStatus = async () => {
    try {
      const voted = await hasUserVoted(id)
      setHasVoted(voted)
    } catch (error) {
      console.error('Error checking vote status:', error)
    }
  }

  const handleVote = async () => {
    if (hasVoted || isVoting) return

    try {
      setIsVoting(true)
      await voteForProject(id)
      setHasVoted(true)
      // 투표 수를 즉시 증가시킴 (낙관적 업데이트)
      setCurrentVoteCount((prev) => prev + 1)
      // 부모 컴포넌트에 변경 알림 (전체 데이터 새로고침)
      if (onVoteChange) {
        await onVoteChange()
      }
    } catch (error: any) {
      console.error('Error voting:', error)
      // 에러 발생 시 이전 상태로 롤백
      setHasVoted(false)
      setCurrentVoteCount(voteCount)
      alert(error.message || '투표에 실패했습니다')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageError ? defaultImage : imageUrl} 
          alt={title} 
          className={styles.image}
          onError={() => setImageError(true)}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <div className={styles.progress}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                fill="#849973"
              />
            </svg>
            <span className={styles.progressText}>{progress}%</span>
          </div>
          <p className={styles.price}>{price}</p>
        </div>
        <button
          className={`${styles.voteButton} ${hasVoted ? styles.voted : ''}`}
          onClick={handleVote}
          disabled={hasVoted || isVoting}
        >
          {hasVoted ? '✓ 투표 완료' : isVoting ? '투표 중...' : '투표하기'}
        </button>
        <div className={styles.voteCount}>
          {currentVoteCount.toLocaleString()}명 투표
        </div>
      </div>
    </div>
  )
}


