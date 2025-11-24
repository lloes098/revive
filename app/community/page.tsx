'use client'

import { useState } from 'react'
import CommunityIcon from '@/components/icons/CommunityIcon'
import CommunityTabs from '@/components/CommunityTabs'
import PopularTab from '@/components/PopularTab'
import FeedTab from '@/components/FeedTab'
import GroupTab from '@/components/GroupTab'
import styles from './page.module.css'

type TabId = 'feed' | 'popular' | 'groups'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabId>('popular')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'popular':
        return <PopularTab />
      case 'feed':
        return <FeedTab />
      case 'groups':
        return <GroupTab />
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <CommunityIcon color="#FFFFFF" />
          </div>
          <h1 className={styles.title}>커뮤니티</h1>
        </div>
        <p className={styles.subtitle}>빈티지 패션을 사랑하는 사람들과 소통하세요</p>
      </div>
      <div className={styles.tabsSection}>
        <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className={styles.contentSection}>
        {renderTabContent()}
      </div>
    </div>
  )
}



