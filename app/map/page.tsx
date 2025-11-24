'use client'

import { useState } from 'react'
import styles from './page.module.css'
import StoreCard from '@/components/StoreCard'
import StoreDetailModal from '@/components/StoreDetailModal'

interface Store {
  name: string
  distance: string
  rating: number
  status?: string
  tags: string[]
  hours: string
  completed: number
  awards: string[]
  phone?: string
  address?: string
  subwayInfo?: string
  description?: string
  isOpenNow?: boolean
}

const stores: Store[] = [
  {
    name: '빈티지38',
    distance: '50m',
    rating: 4.8,
    status: '업사이클링 의뢰 중',
    tags: ['90s', 'Denim', 'Streetwear'],
    hours: '12:00 - 21:00',
    completed: 23,
    awards: ['블루리본', '친환경 챔피언', '업사이클 마스터'],
    phone: '02-1234-5678',
    address: '서울 마포구 와우산로29길 12',
    subwayInfo: '2호선 홍대입구역 9번 출구에서 425m',
    description: '홍대 최초의 빈티지샵으로서 20년의 전통을 자랑합니다. 유럽과 미국에서 직접 공수한 정통 빈티지 의류와 액세서리들을 합리적인 가격으로 만나보실 수 있습니다.',
    isOpenNow: true,
  },
  {
    name: '레트로하우스',
    distance: '120m',
    rating: 4.9,
    status: '업사이클링 의뢰 중',
    tags: ['Y2K', 'Archive', 'Designer'],
    hours: '13:00 - 22:00',
    completed: 45,
    awards: ['업사이클 마스터', '신뢰 매장'],
    phone: '02-2345-6789',
    address: '서울 마포구 와우산로29길 15',
  },
  {
    name: '홍대빈티지',
    distance: '200m',
    rating: 4.7,
    tags: ['Leather', 'Outerwear', 'Premium'],
    hours: '14:00 - 20:00',
    completed: 12,
    awards: ['신뢰 매장'],
    phone: '02-3456-7890',
    address: '서울 마포구 와우산로29길 20',
  },
  {
    name: '타임캡슐',
    distance: '280m',
    rating: 4.6,
    status: '업사이클링 의뢰 중',
    tags: ['Sportswear', '80s', 'Vintage Tees'],
    hours: '12:00 - 21:00',
    completed: 34,
    awards: ['블루리본', '친환경 챔피언'],
    phone: '02-4567-8901',
    address: '서울 마포구 와우산로29길 25',
  },
]

export default function MapPage() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  return (
    <div className={styles.page}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g opacity="0.9">
              <path
                d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <h1 className={styles.title}>매장 지도</h1>
        </div>
        <p className={styles.subtitle}>
          홍대 빈티지 문화의 중심, 가까운 매장을 찾아보세요
        </p>
      </div>

      {/* Stats Card */}
      <div className={styles.statsCard}>
        <div className={styles.statsRow}>
          <span className={styles.statsText}>
            <span className={styles.statsNumber}>24</span>
            <span>개의 매장에서</span>
          </span>
        </div>
        <div className={styles.statsRow}>
          <span className={styles.statsText}>
            <span className={styles.statsNumber}>156</span>
            <span>건의 업사이클링 진행중</span>
          </span>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className={styles.imagePlaceholder}>
        <div className={styles.placeholderContent}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L22 16M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>이미지</span>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.filterButtonRow}>
          <span className={styles.locationText}>홍대입구역 주변 매장</span>
          <button className={styles.filterButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_32_1479)">
                <path
                  d="M6.66665 13.3333C6.66659 13.4572 6.70106 13.5787 6.76618 13.6841C6.8313 13.7895 6.9245 13.8746 7.03532 13.93L8.36865 14.5967C8.47031 14.6475 8.58328 14.6714 8.69681 14.6663C8.81035 14.6612 8.92068 14.6271 9.01734 14.5673C9.11399 14.5075 9.19376 14.424 9.24906 14.3247C9.30437 14.2254 9.33337 14.1137 9.33332 14V9.33333C9.33347 9.00292 9.45629 8.68433 9.67798 8.43933L14.4933 3.11333C14.5796 3.01771 14.6364 2.89912 14.6567 2.77192C14.6771 2.64472 14.6601 2.51435 14.6079 2.39658C14.5557 2.27881 14.4705 2.17868 14.3627 2.1083C14.2548 2.03792 14.1288 2.0003 14 2H1.99998C1.87105 2.00005 1.74491 2.03748 1.63682 2.10776C1.52873 2.17804 1.44334 2.27815 1.39099 2.39598C1.33864 2.5138 1.32157 2.64427 1.34187 2.77159C1.36216 2.89892 1.41893 3.01762 1.50532 3.11333L6.32198 8.43933C6.54367 8.68433 6.6665 9.00292 6.66665 9.33333V13.3333Z"
                  stroke="white"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_32_1479">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            필터
          </button>
        </div>

        {/* Store List Section */}
        <div className={styles.storeSection}>
          <div className={styles.storeList}>
            {stores.map((store, index) => (
              <StoreCard
                key={index}
                name={store.name}
                distance={store.distance}
                rating={store.rating}
                status={store.status}
                tags={store.tags}
                hours={store.hours}
                completed={store.completed}
                awards={store.awards}
                onClick={() => setSelectedStore(store)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Store Detail Modal */}
      {selectedStore && (
        <StoreDetailModal
          isOpen={!!selectedStore}
          onClose={() => setSelectedStore(null)}
          name={selectedStore.name}
          distance={selectedStore.distance}
          rating={selectedStore.rating}
          status={selectedStore.status}
          tags={selectedStore.tags}
          hours={selectedStore.hours}
          completed={selectedStore.completed}
          awards={selectedStore.awards}
          phone={selectedStore.phone}
          address={selectedStore.address}
          subwayInfo={selectedStore.subwayInfo}
          description={selectedStore.description}
          isOpenNow={selectedStore.isOpenNow}
        />
      )}
    </div>
  )
}
