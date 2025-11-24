'use client'

import styles from './CommunityTabs.module.css'

export type TabId = 'feed' | 'popular' | 'groups'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'feed', label: '피드' },
  { id: 'popular', label: '인기' },
  { id: 'groups', label: '그룹' },
]

interface CommunityTabsProps {
  activeTab: TabId
  onTabChange: (tabId: TabId) => void
}

export default function CommunityTabs({
  activeTab,
  onTabChange,
}: CommunityTabsProps) {
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

