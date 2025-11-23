'use client'

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
  return (
    <div className="flex flex-col">
      <div className={styles.card}>
        <div className={styles.cardBackground}>
          <div className={`${styles.square} ${styles.squareTopLeft}`}></div>
          <div className={`${styles.square} ${styles.squareTopRight}`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
                stroke="#21882D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18.3333C13.3333 14.1667 16.6667 11.1075 16.6667 8.33333C16.6667 5.55913 14.4409 3.33333 11.6667 3.33333C10.5616 3.33333 9.50179 3.77193 8.75044 4.52328C8.49909 4.77463 8.33333 5.10196 8.33333 5.44167C8.33333 5.78137 8.49909 6.1087 8.75044 6.36005C9.50179 7.1114 10.5616 7.55 11.6667 7.55C12.7718 7.55 13.8316 7.1114 14.5829 6.36005C14.8343 6.1087 15 5.78137 15 5.44167C15 5.10196 14.8343 4.77463 14.5829 4.52328C13.8316 3.77193 12.7718 3.33333 11.6667 3.33333C8.89246 3.33333 6.66667 5.55913 6.66667 8.33333C6.66667 11.1075 10 14.1667 10 18.3333Z"
                stroke="#21882D"
                strokeWidth="1.5"
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
      <button className={styles.button} onClick={onApplyClick}>
        <svg
          className={styles.buttonIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 10L9.16667 10.8333L11.6667 8.33333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33333 5.83333H16.6667C17.5871 5.83333 18.3333 6.57953 18.3333 7.5V15.8333C18.3333 16.7538 17.5871 17.5 16.6667 17.5H3.33333C2.41286 17.5 1.66667 16.7538 1.66667 15.8333V7.5C1.66667 6.57953 2.41286 5.83333 3.33333 5.83333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.buttonText}>리셀 판매 신청하기</span>
      </button>
    </div>
  )
}

