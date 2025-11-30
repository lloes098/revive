'use client'

import Link from 'next/link'
import styles from './ProductSection.module.css'
import ProductCard from './ProductCard'
import FilterButtons from './FilterButtons'

interface Product {
  id: string
  image: string
  badge: string
  brand: string
  productName: string
  productType: string
  price: number
  isLiked?: boolean
}

interface ProductSectionProps {
  title?: string
  products?: Product[]
  onViewMoreClick?: () => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    badge: 'A+등급',
    brand: '빈티지38 x 김민수',
    productName: "Levi's 501 데님",
    productType: '숄더백',
    price: 145000,
    isLiked: false,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    badge: 'S등급',
    brand: '올드서울 x 박지영',
    productName: '밀리터리 재킷',
    productType: '크로스백',
    price: 128000,
    isLiked: false,
  },
]

export default function ProductSection({
  title = '오늘의 업사이클링템',
  products = defaultProducts,
  onViewMoreClick,
}: ProductSectionProps) {
  return (
    <div className={styles.container}>
      <FilterButtons />
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link 
          href="/upcycle" 
          className={styles.viewMore}
          onClick={onViewMoreClick}
        >
          더보기 <span className={styles.arrow}>→</span>
        </Link>
      </div>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            badge={product.badge}
            brand={product.brand}
            productName={product.productName}
            productType={product.productType}
            price={product.price}
            isLiked={product.isLiked}
          />
        ))}
      </div>
    </div>
  )
}




