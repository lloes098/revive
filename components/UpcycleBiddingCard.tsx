'use client'

import styles from './UpcycleBiddingCard.module.css'

interface UpcycleBiddingCardProps {
  image: string
  brand: string
  title: string
  progress: number
  price: string
}

export default function UpcycleBiddingCard({
  image,
  brand,
  title,
  progress,
  price,
}: UpcycleBiddingCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
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
      </div>
    </div>
  )
}

