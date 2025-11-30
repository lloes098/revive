'use client'

import { useState } from 'react'
import styles from './GroupTab.module.css'
import GroupJoinModal from './GroupJoinModal'

interface Group {
  id: string
  name: string
  memberCount: number
}

const defaultGroups: Group[] = [
  { id: '1', name: '90s Denim', memberCount: 1247 },
  { id: '2', name: 'Y2K Fashion', memberCount: 2134 },
  { id: '3', name: 'Archive Core', memberCount: 856 },
  { id: '4', name: 'Sportswear', memberCount: 642 },
  { id: '5', name: 'Leather Lovers', memberCount: 423 },
]

export default function GroupTab() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleJoinClick = (group: Group) => {
    setSelectedGroup(group)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGroup(null)
  }

  const handleJoin = () => {
    // 가입 성공 처리
    console.log(`가입 완료: ${selectedGroup?.name}`)
    // 여기에 실제 가입 API 호출 로직 추가
  }

  return (
    <div className={styles.container}>
      {/* 그룹 생성 섹션 */}
      <div className={styles.createGroupSection}>
        <h2 className={styles.createGroupTitle}>관심사 기반 그룹</h2>
        <div className={styles.createGroupDescription}>
          <p>같은 취향의 사람들과</p>
          <p>더 깊은 이야기를 나누세요</p>
        </div>
        <button className={styles.createButton}>
          + 새 그룹 만들기
        </button>
      </div>

      {/* 그룹 리스트 */}
      <div className={styles.groupsList}>
        {defaultGroups.map((group) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupIcon}>
              <div className={styles.iconPlaceholder} />
            </div>
            <div className={styles.groupInfo}>
              <h3 className={styles.groupName}>{group.name}</h3>
              <p className={styles.memberCount}>멤버 {group.memberCount.toLocaleString()}명</p>
            </div>
            <button
              className={styles.joinButton}
              onClick={() => handleJoinClick(group)}
            >
              가입
            </button>
          </div>
        ))}
      </div>

      {/* 그룹 가입 모달 */}
      {selectedGroup && (
        <GroupJoinModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          groupName={selectedGroup.name}
          memberCount={selectedGroup.memberCount}
          onJoin={handleJoin}
        />
      )}
    </div>
  )
}


