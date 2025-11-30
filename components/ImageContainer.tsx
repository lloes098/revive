import styles from './ImageContainer.module.css'

interface ImageContainerProps {
  src?: string
  alt?: string
}

export default function ImageContainer({ 
  src = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=600&fit=crop', 
  alt = '90년대 데님 컬렉션' 
}: ImageContainerProps) {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.imageContainer} />
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>90년대 데님 컬렉션</h2>
          <p className={styles.subtitle}>빈티지38 신규 입고</p>
          <div className={styles.dots}>
            <div className={styles.dotActive}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

