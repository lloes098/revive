'use client'

import styles from './RecommendedBrands.module.css'
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

interface RecommendedBrandsProps {
  title?: string
  products?: Product[]
  onViewMoreClick?: () => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
    badge: 'A+등급',
    brand: '아웃도어빈티지 x The North Face',
    productName: '눕시 다운',
    price: 162000,
    isLiked: false,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    badge: 'A등급',
    brand: '프레피스타일 x Ralph Lauren',
    productName: '폴로 셔츠',
    price: 54000,
    isLiked: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    badge: 'A등급',
    brand: '빈티지38 x Champion',
    productName: '스타디움 자켓',
    price: 76000,
    isLiked: false,
  },
]

export default function RecommendedBrands({
  title = 'REVIVE 에 새로 추가된 추천 브랜드 상품',
  products = defaultProducts,
  onViewMoreClick,
}: RecommendedBrandsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
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




