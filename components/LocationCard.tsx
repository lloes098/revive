'use client'

import { useRouter } from 'next/navigation'
import styles from './LocationCard.module.css'

interface LocationCardProps {
  location?: string
  storeCount?: number
  radius?: number
  onApplyClick?: () => void
}

export default function LocationCard({
  location = '홍대입구역 주변',
  storeCount = 4,
  radius = 500,
  onApplyClick,
}: LocationCardProps) {
  const router = useRouter()

  const handleApplyClick = () => {
    if (onApplyClick) {
      onApplyClick()
    } else {
      router.push('/resale/apply')
    }
  }

  return (
    <div className="flex flex-col">
      <div className={styles.card}>
        <div className={styles.cardBackground}>
          <div className={`${styles.square} ${styles.squareTopLeft}`}></div>
          <div className={`${styles.square} ${styles.squareTopRight}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                stroke="#849973"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="#849973"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={`${styles.square} ${styles.squareBottomLeft}`}></div>
          <div className={`${styles.square} ${styles.squareBottomRight}`}></div>
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.title}>{location}</h2>
          <p className={styles.subtitle}>반경 {radius}m 내 매장 {storeCount}곳</p>
        </div>
      </div>
      <button className={styles.button} onClick={handleApplyClick}>
        <svg
          className={styles.buttonIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6667 6.66669C10.6667 7.37393 10.3857 8.05221 9.88562 8.55231C9.38552 9.0524 8.70725 9.33335 8 9.33335C7.29276 9.33335 6.61448 9.0524 6.11438 8.55231C5.61429 8.05221 5.33334 7.37393 5.33334 6.66669"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.06866 4.02264H13.9313"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.26667 3.64465C2.09357 3.87544 2 4.15615 2 4.44465V13.3333C2 13.6869 2.14048 14.0261 2.39052 14.2761C2.64057 14.5262 2.97971 14.6666 3.33333 14.6666H12.6667C13.0203 14.6666 13.3594 14.5262 13.6095 14.2761C13.8595 14.0261 14 13.6869 14 13.3333V4.44465C14 4.15615 13.9064 3.87544 13.7333 3.64465L12.4 1.86665C12.2758 1.70105 12.1148 1.56665 11.9296 1.47408C11.7445 1.38151 11.5403 1.33331 11.3333 1.33331H4.66667C4.45967 1.33331 4.25552 1.38151 4.07038 1.47408C3.88524 1.56665 3.7242 1.70105 3.6 1.86665L2.26667 3.64465Z"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.buttonText}>리셀 판매 신청하기</span>
      </button>
    </div>
  )
}

