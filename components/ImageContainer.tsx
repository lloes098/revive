'use client'

import { useState, useEffect } from 'react'
import styles from './ImageContainer.module.css'

interface BannerItem {
  src: string
  alt: string
  title: string
  subtitle: string
}

interface ImageContainerProps {
  banners?: BannerItem[]
}

const defaultBanners: BannerItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=600&fit=crop&q=80',
    alt: '90년대 데님 컬렉션',
    title: '90년대 데님 컬렉션',
    subtitle: '빈티지38 신규 입고',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&q=80',
    alt: 'Y2K 스타일 컬렉션',
    title: 'Y2K 스타일 컬렉션',
    subtitle: '레트로하우스 신상품',
  },
  {
    src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop&q=80',
    alt: '빈티지 자켓 특가',
    title: '빈티지 자켓 특가',
    subtitle: '홍대빈티지 한정 할인',
  },
  {
    src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=600&fit=crop&q=80',
    alt: '레더 재킷 컬렉션',
    title: '레더 재킷 컬렉션',
    subtitle: '타임캡슐 프리미엄',
  },
  {
    src: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=600&fit=crop&q=80',
    alt: '스트리트웨어 세일',
    title: '스트리트웨어 세일',
    subtitle: '올드스쿨 특별가',
  },
]

export default function ImageContainer({ 
  banners = defaultBanners
}: ImageContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 4000) // 4초마다 자동으로 넘어감

    return () => clearInterval(interval)
  }, [banners.length])

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const currentBanner = banners[currentIndex]

  // fallback 이미지 URL
  const fallbackImage = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=600&fit=crop&q=80'

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={imageErrors[index] ? fallbackImage : banner.src}
            alt={banner.alt}
            className={`${styles.imageContainer} ${
              index === currentIndex ? styles.imageActive : styles.imageInactive
            }`}
            onError={() => handleImageError(index)}
            loading="lazy"
          />
        ))}
      </div>
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{currentBanner.title}</h2>
          <p className={styles.subtitle}>{currentBanner.subtitle}</p>
          <div className={styles.dots}>
            {banners.map((_, index) => (
              <div
                key={index}
                className={index === currentIndex ? styles.dotActive : styles.dot}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

