'use client'

import styles from './ProductCard.module.css'
import { useState } from 'react'

interface ProductCardProps {
  image: string
  badge: string
  brand: string
  productName: string
  productType: string
  price: number
  isLiked?: boolean
  onLikeClick?: () => void
}

export default function ProductCard({
  image,
  badge,
  brand,
  productName,
  productType,
  price,
  isLiked = false,
  onLikeClick,
}: ProductCardProps) {
  const [liked, setLiked] = useState(isLiked)

  const handleLikeClick = () => {
    setLiked(!liked)
    onLikeClick?.()
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={productName} className={styles.productImage} />
        <div className={styles.badge}>{badge}</div>
        <button className={styles.likeButton} onClick={handleLikeClick}>
          <svg
            className={styles.likeIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13.3333L6.66667 12.1333C4.66667 10.4 3.33333 9.06667 3.33333 7.33333C3.33333 5.86667 4.53333 4.66667 6 4.66667C6.8 4.66667 7.53333 5.06667 8 5.66667C8.46667 5.06667 9.2 4.66667 10 4.66667C11.4667 4.66667 12.6667 5.86667 12.6667 7.33333C12.6667 9.06667 11.3333 10.4 9.33333 12.1333L8 13.3333Z"
              fill={liked ? '#FF6B6B' : 'none'}
              stroke={liked ? '#FF6B6B' : '#999'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className={styles.brand}>{brand}</p>
      <p className={styles.productName}>{productName}</p>
      {productType && <p className={styles.productType}>→ {productType}</p>}
      <p className={styles.price}>{price.toLocaleString()}원</p>
    </div>
  )
}

