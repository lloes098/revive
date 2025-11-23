'use client'

import styles from './DiscountedProducts.module.css'
import ProductCard from './ProductCard'
import { useState } from 'react'

interface Product {
  id: string
  image: string
  badge: string
  brand: string
  productName: string
  price: number
  isLiked?: boolean
}

interface DiscountedProductsProps {
  title?: string
  products?: Product[]
  onViewAllClick?: () => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    image: '/placeholder-product-3.jpg',
    badge: 'A등급',
    brand: '빈티지38',
    productName: "90s Levi's 501 데님",
    price: 89000,
    isLiked: false,
  },
  {
    id: '2',
    image: '/placeholder-product-4.jpg',
    badge: 'S등급',
    brand: '레트로무드',
    productName: 'Y2K 크로쉐 망토',
    price: 40000,
    isLiked: false,
  },
  {
    id: '3',
    image: '/placeholder-product-5.jpg',
    badge: 'A+등급',
    brand: '홍대빈티지',
    productName: 'Schott 레더 라이더 자켓',
    price: 320000,
    isLiked: false,
  },
  {
    id: '4',
    image: '/placeholder-product-6.jpg',
    badge: 'A등급',
    brand: '스트리트클래식',
    productName: 'Dickies 워크팬츠',
    price: 75000,
    isLiked: false,
  },
]

const categories = ['전체', '남성', '여성']

export default function DiscountedProducts({
  title = '오늘 추가 할인된 상품',
  products = defaultProducts,
  onViewAllClick,
}: DiscountedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <a className={styles.viewAll} onClick={onViewAllClick}>
          전체 <span className={styles.arrow}>→</span>
        </a>
      </div>
      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
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

