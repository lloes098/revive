'use client'

import { useState } from 'react'
import styles from './CompletedCard.module.css'

interface CompletedCardProps {
  image: string
  brand: string
  title: string
  completedDate: string
  price: string
}

export default function CompletedCard({
  image,
  brand,
  title,
  completedDate,
  price,
}: CompletedCardProps) {
  const [imageError, setImageError] = useState(false)
  const defaultImage = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
  const imageUrl = image || defaultImage

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageError ? defaultImage : imageUrl} 
          alt={title} 
          className={styles.image}
          onError={() => setImageError(true)}
        />
        <div className={styles.completedBadge}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3333 4L6 11.3333L2.66667 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <div className={styles.dateInfo}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 2H2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V3C11 2.44772 10.5523 2 10 2Z"
                stroke="#849973"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 4H11"
                stroke="#849973"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.dateText}>{completedDate}</span>
          </div>
          <p className={styles.price}>{price}</p>
        </div>
      </div>
    </div>
  )
}


