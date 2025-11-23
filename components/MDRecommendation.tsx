'use client'

import styles from './MDRecommendation.module.css'
import ProductCard from './ProductCard'

interface Product {
  id: string
  image: string
  badge: string
  brand: string
  productName: string
  price: number
  isLiked?: boolean
}

interface MDRecommendationProps {
  title?: string
  subtitle?: string
  products?: Product[]
  onViewMoreClick?: () => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    image: '/placeholder-product-12.jpg',
    badge: 'A등급',
    brand: '빈티지38',
    productName: "90s Levi's 501 데님",
    price: 89000,
    isLiked: false,
  },
  {
    id: '2',
    image: '/placeholder-product-13.jpg',
    badge: 'S등급',
    brand: '레트로무드',
    productName: 'Y2K 크로쉐 망토',
    price: 40000,
    isLiked: false,
  },
  {
    id: '3',
    image: '/placeholder-product-14.jpg',
    badge: 'A+등급',
    brand: '홍대빈티지',
    productName: 'Schott 라이더 자켓',
    price: 320000,
    isLiked: false,
  },
  {
    id: '4',
    image: '/placeholder-product-15.jpg',
    badge: 'A등급',
    brand: '스트리트클래식',
    productName: 'Dickies 팬츠',
    price: 75000,
    isLiked: false,
  },
]

export default function MDRecommendation({
  title = 'MD 추천',
  subtitle = '지금 주목할 아이템',
  products = defaultProducts,
  onViewMoreClick,
}: MDRecommendationProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <a className={styles.viewMore} onClick={onViewMoreClick}>
          더보기 <span className={styles.arrow}>→</span>
        </a>
      </div>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            badge={product.badge}
            brand={product.brand}
            productName={product.productName}
            productType=""
            price={product.price}
            isLiked={product.isLiked}
          />
        ))}
      </div>
    </div>
  )
}

