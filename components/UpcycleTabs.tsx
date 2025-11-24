'use client'

import styles from './UpcycleTabs.module.css'

export type UpcycleTabId = 'voting' | 'production' | 'completed'

interface Tab {
  id: UpcycleTabId
  label: string
}

const tabs: Tab[] = [
  { id: 'voting', label: '투표 중' },
  { id: 'production', label: '제작 중' },
  { id: 'completed', label: '완료됨' },
]

interface UpcycleTabsProps {
  activeTab: UpcycleTabId
  onTabChange: (tabId: UpcycleTabId) => void
}

export default function UpcycleTabs({
  activeTab,
  onTabChange,
}: UpcycleTabsProps) {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}


