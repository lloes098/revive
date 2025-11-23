'use client'

import styles from './PopularBrands.module.css'
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

interface PopularBrandsProps {
  title?: string
  products?: Product[]
  onViewMoreClick?: () => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    image: '/placeholder-product-10.jpg',
    badge: 'A등급',
    brand: '스트릿아카이브',
    productName: 'Stussy 90s 티셔츠',
    price: 62000,
    isLiked: false,
  },
  {
    id: '2',
    image: '/placeholder-product-11.jpg',
    badge: 'A등급',
    brand: '홍대빈티지',
    productName: 'Lacoste 가디건',
    price: 54000,
    isLiked: false,
  },
]

export default function PopularBrands({
  title = 'REVIVE 인기 브랜드 상품',
  products = defaultProducts,
  onViewMoreClick,
}: PopularBrandsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <a className={styles.viewMore} onClick={onViewMoreClick}>
          더보기 <span className={styles.arrow}>→</span>
        </a>
      </div>
      <div className={styles.productsContainer}>
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

