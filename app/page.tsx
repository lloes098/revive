import Header from '@/components/Header'
import ImageContainer from '@/components/ImageContainer'
import LocationCard from '@/components/LocationCard'
import EnvironmentStats from '@/components/EnvironmentStats'
import FilterButtons from '@/components/FilterButtons'
import ProductSection from '@/components/ProductSection'
import DiscountedProducts from '@/components/DiscountedProducts'
import RecommendedBrands from '@/components/RecommendedBrands'
import PopularBrands from '@/components/PopularBrands'
import MDRecommendation from '@/components/MDRecommendation'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Section 1: Header */}
      <section className={styles.section}>
        <Header />
      </section>

      {/* Section 2: Image Container */}
      <section className={styles.section}>
        <ImageContainer />
      </section>

      {/* Section 3: Location Card */}
      <section className={styles.section} style={{ minHeight: '6.25rem', overflow: 'visible', padding: '1rem' }}>
        <LocationCard />
      </section>

      {/* 환경 절감 효과 */}
      <section className={styles.section}>
        <EnvironmentStats />
      </section>

      {/* 오늘의 업사이클링텝 */}
      <section className={styles.section}>
        <FilterButtons />
      </section>

      {/* 오늘의 추가 할인 상품 */}
      <section className={styles.section}>
        <ProductSection />
      </section>

      {/* 오늘 추가 할인된 상품 */}
      <section className={styles.section}>
        <DiscountedProducts />
      </section>

      {/* REVIVE 에 새로 추가된 추천 브랜드 상품 */}
      <section className={styles.section}>
        <RecommendedBrands />
      </section>

      {/* REVIVE 인기 브랜드 상품 */}
      <section className={styles.section}>
        <PopularBrands />
      </section>

      {/* MD 추천 */}
      <section className={styles.section}>
        <MDRecommendation />
      </section>
    </div>
  )
}

