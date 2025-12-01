'use client'

import { useState, useEffect } from 'react'
import styles from './GroupTab.module.css'
import GroupJoinModal from './GroupJoinModal'
import CreateGroupModal from './CreateGroupModal'
import { getGroups, createGroup, joinGroup, type Group } from '@/utils/groups'

export default function GroupTab() {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    try {
      setIsLoading(true)
      const data = await getGroups()
      setGroups(data)
    } catch (error) {
      console.error('Failed to load groups:', error)
      // 에러 발생 시 빈 배열로 설정
      setGroups([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateGroup = async (groupData: { name: string; description: string; category: string }) => {
    try {
      await createGroup(groupData)
      // 그룹 생성 후 목록 새로고침
      await loadGroups()
    } catch (error: any) {
      throw error
    }
  }

  const handleJoinClick = (group: Group) => {
    setSelectedGroup(group)
    setIsJoinModalOpen(true)
  }

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false)
    setSelectedGroup(null)
  }

  const handleJoin = async () => {
    if (!selectedGroup) return
    
    try {
      await joinGroup(selectedGroup.id)
      // 가입 성공 후 목록 새로고침
      await loadGroups()
      handleCloseJoinModal()
    } catch (error: any) {
      console.error('Failed to join group:', error)
      alert(error.message || '그룹 가입에 실패했습니다')
    }
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
        <button 
          className={styles.createButton}
          onClick={() => setIsCreateModalOpen(true)}
        >
          + 새 그룹 만들기
        </button>
      </div>

      {/* 그룹 리스트 */}
      <div className={styles.groupsList}>
        {isLoading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : groups.length === 0 ? (
          <div className={styles.emptyState}>
            <p>아직 생성된 그룹이 없습니다.</p>
            <p>첫 번째 그룹을 만들어보세요!</p>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <div className={styles.iconPlaceholder} />
              </div>
              <div className={styles.groupInfo}>
                <h3 className={styles.groupName}>{group.name}</h3>
                <p className={styles.memberCount}>멤버 {group.member_count.toLocaleString()}명</p>
              </div>
              <button
                className={styles.joinButton}
                onClick={() => handleJoinClick(group)}
              >
                가입
              </button>
            </div>
          ))
        )}
      </div>

      {/* 그룹 가입 모달 */}
      {selectedGroup && (
        <GroupJoinModal
          isOpen={isJoinModalOpen}
          onClose={handleCloseJoinModal}
          groupName={selectedGroup.name}
          memberCount={selectedGroup.member_count}
          onJoin={handleJoin}
        />
      )}

      {/* 그룹 생성 모달 */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  )
}


