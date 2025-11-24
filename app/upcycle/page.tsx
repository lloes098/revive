'use client'

import { useState } from 'react'
import UpcycleIcon from '@/components/icons/UpcycleIcon'
import UpcycleTabs, { UpcycleTabId } from '@/components/UpcycleTabs'
import UpcycleBiddingCard from '@/components/UpcycleBiddingCard'
import ProductionCard from '@/components/ProductionCard'
import styles from './page.module.css'

const defaultProjects = [
  {
    id: '1',
    image: '/placeholder-upcycle-1.jpg',
    brand: '빈티지38',
    title: '10년째 창고신세,\n그의 세련된 변신',
    progress: 68,
    price: '65,000원~',
  },
  {
    id: '2',
    image: '/placeholder-upcycle-2.jpg',
    brand: '레트로하우스',
    title: '사장님도 잊어버린 90s 밴드티의 변신',
    progress: 54,
    price: '45,000원~',
  },
  {
    id: '3',
    image: '/placeholder-upcycle-3.jpg',
    brand: '홍대빈티지',
    title: '손상된 레더의\n럭셔리한 재탄생',
    progress: 82,
    price: '9,000원~',
  },
  {
    id: '4',
    image: '/placeholder-upcycle-4.jpg',
    brand: '타임캡슐',
    title: '빛바랜 실크의\n세상 우아한 귀환',
    progress: 45,
    price: '35,000원~',
  },
]

const productionProjects = [
  {
    id: '1',
    image: '/placeholder-production-1.jpg',
    brand: '올드스쿨',
    title: '먼지 쌓인 데님\n화려한 변신',
    progress: 75,
    progressText: '제작 진행중',
    releaseDate: 'D-5',
  },
  {
    id: '2',
    image: '/placeholder-production-2.jpg',
    brand: '빈티지마켓',
    title: '해골티의\n새로운 시작',
    progress: 30,
    progressText: '원본 배송중',
    releaseDate: 'D-10',
  },
  {
    id: '3',
    image: '/placeholder-production-3.jpg',
    brand: '아카이브샵',
    title: '낡은 가죽이\n프리미엄으로',
    progress: 95,
    progressText: '제품 배송중',
    releaseDate: 'D-2',
  },
]

export default function UpcyclePage() {
  const [activeTab, setActiveTab] = useState<UpcycleTabId>('voting')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'voting':
        return (
          <div className={styles.projectsGrid}>
            {defaultProjects.map((project) => (
              <UpcycleBiddingCard
                key={project.id}
                image={project.image}
                brand={project.brand}
                title={project.title}
                progress={project.progress}
                price={project.price}
              />
            ))}
          </div>
        )
      case 'production':
        return (
          <div className={styles.productionList}>
            {productionProjects.map((project) => (
              <ProductionCard
                key={project.id}
                image={project.image}
                brand={project.brand}
                title={project.title}
                progress={project.progress}
                progressText={project.progressText}
                releaseDate={project.releaseDate}
              />
            ))}
          </div>
        )
      case 'completed':
        return <div className={styles.tabContent}>완료됨 내용</div>
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <UpcycleIcon color="#FFFFFF" />
          </div>
          <h1 className={styles.title}>Upcycle Bidding</h1>
        </div>
        <p className={styles.subtitle}>우리 재고가 달라졌어요!</p>
        <div className={styles.stats}>
          <div className={styles.statRow}>
            <span className={styles.statNumber}>89</span>
            <span className={styles.statText}>개의 프로젝트가 완료되고</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statNumber}>1,247</span>
            <span className={styles.statText}>명이 투표 참여중</span>
          </div>
        </div>
      </div>
      <div className={styles.tabsSection}>
        <UpcycleTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className={styles.contentSection}>
        {renderTabContent()}
      </div>
    </div>
  )
}



