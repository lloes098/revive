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
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    badge: 'A등급',
    brand: '빈티지38',
    productName: "90s Levi's 501 데님",
    price: 89000,
    isLiked: false,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    badge: 'S등급',
    brand: '레트로무드',
    productName: 'Y2K 크로쉐 망토',
    price: 40000,
    isLiked: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    badge: 'A+등급',
    brand: '홍대빈티지',
    productName: 'Schott 라이더 자켓',
    price: 320000,
    isLiked: false,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
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




