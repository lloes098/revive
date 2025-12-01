'use client'

import { useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import styles from './page.module.css'

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

// 전체 상품 목록 (예시 데이터)
const allProducts: Product[] = [
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
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    badge: 'A+등급',
    brand: '빈티지38',
    productName: "90s Levi's 501 데님",
    price: 89000,
    isLiked: false,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    badge: 'S등급',
    brand: '레트로무드',
    productName: 'Y2K 크로쉐 망토',
    price: 40000,
    isLiked: false,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    badge: 'A등급',
    brand: '스트리트클래식',
    productName: 'Dickies 워크팬츠',
    price: 75000,
    isLiked: false,
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
    badge: 'A+등급',
    brand: '홍대빈티지',
    productName: 'Schott 레더 라이더 자켓',
    price: 320000,
    isLiked: false,
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    badge: 'A등급',
    brand: '올드서울',
    productName: '밀리터리 재킷',
    price: 128000,
    isLiked: false,
  },
]

export default function ProductsPage() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.title}>전체 상품</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* 상품 그리드 */}
      <div className={styles.productsGrid}>
        {allProducts.map((product) => (
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

