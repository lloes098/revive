'use client'

import { useState } from 'react'
import styles from './ProductionCard.module.css'

interface ProductionCardProps {
  image: string
  brand: string
  title: string
  progress: number
  progressText: string
  releaseDate: string
}

export default function ProductionCard({
  image,
  brand,
  title,
  progress,
  progressText,
  releaseDate,
}: ProductionCardProps) {
  const [imageError, setImageError] = useState(false)
  const defaultImage = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop'
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
      </div>
      <div className={styles.content}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressPercent}>{progress}%</span>
            <span className={styles.progressText}>{progressText}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className={styles.releaseDate}>
          <span className={styles.releaseLabel}>공개일</span>
          <span className={styles.releaseValue}>{releaseDate}</span>
        </div>
      </div>
    </div>
  )
}


