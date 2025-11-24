'use client'

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
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
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


