import styles from './ImageContainer.module.css'

interface ImageContainerProps {
  src?: string
  alt?: string
}

export default function ImageContainer({ src, alt = 'Image' }: ImageContainerProps) {
  return (
    <>
      {src ? (
        <img src={src} alt={alt} className={styles.imageContainer} />
      ) : (
        <div className={styles.imageContainer} style={{ backgroundColor: '#F5F5F0' }} />
      )}
    </>
  )
}

