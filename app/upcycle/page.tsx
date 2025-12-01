'use client'

import { useState, useEffect } from 'react'
import UpcycleIcon from '@/components/icons/UpcycleIcon'
import UpcycleTabs, { UpcycleTabId } from '@/components/UpcycleTabs'
import UpcycleBiddingCard from '@/components/UpcycleBiddingCard'
import ProductionCard from '@/components/ProductionCard'
import CompletedCard from '@/components/CompletedCard'
import {
  getVotingProjects,
  getProductionProjects,
  getCompletedProjects,
  getVotingStats,
  type UpcycleProject,
  type ProductionProject,
  type CompletedProject,
} from '@/utils/upcycle'
import styles from './page.module.css'

function UpcyclePage() {
  const [activeTab, setActiveTab] = useState<UpcycleTabId>('voting')
  const [votingProjects, setVotingProjects] = useState<UpcycleProject[]>([])
  const [productionProjects, setProductionProjects] = useState<ProductionProject[]>([])
  const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([])
  const [stats, setStats] = useState({ completedProjects: 0, totalVotes: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // 페이지 초기 로드 시 통계 및 데이터 로드
  useEffect(() => {
    loadStats()
    loadData()
  }, [])

  // 탭 변경 시 데이터 로드 및 통계 새로고침
  useEffect(() => {
    loadData()
    loadStats() // 탭 변경 시에도 통계 새로고침
  }, [activeTab])

  // 통계 데이터 로드 (헤더에 표시)
  const loadStats = async () => {
    try {
      const votingStats = await getVotingStats()
      console.log('Loaded stats:', votingStats) // 디버깅용
      setStats(votingStats)
    } catch (error) {
      console.error('Failed to load stats:', error)
      // 에러 발생 시에도 기본값으로 설정
      setStats({ completedProjects: 0, totalVotes: 0 })
    }
  }

  const loadData = async () => {
    try {
      setIsLoading(true)
      
      if (activeTab === 'voting') {
        const projects = await getVotingProjects()
        setVotingProjects(projects)
      } else if (activeTab === 'production') {
        const projects = await getProductionProjects()
        setProductionProjects(projects)
      } else if (activeTab === 'completed') {
        const projects = await getCompletedProjects()
        setCompletedProjects(projects)
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
      // 에러 발생 시 빈 배열로 설정
      setVotingProjects([])
      setProductionProjects([])
      setCompletedProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  // 투표 후 데이터 새로고침
  const handleVoteChange = async () => {
    if (activeTab === 'voting') {
      await Promise.all([loadData(), loadStats()]) // 프로젝트와 통계 모두 새로고침
    } else {
      await loadStats() // 다른 탭이어도 통계는 업데이트
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'voting':
        return (
          <div className={styles.projectsGrid}>
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : votingProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <p>투표 중인 프로젝트가 없습니다.</p>
              </div>
            ) : (
              votingProjects.map((project) => (
                <UpcycleBiddingCard
                  key={project.id}
                  id={project.id}
                  image={project.image}
                  brand={project.brand}
                  title={project.title}
                  progress={project.progress}
                  price={project.price}
                  voteCount={project.vote_count || 0}
                  onVoteChange={handleVoteChange}
                />
              ))
            )}
          </div>
        )
      case 'production':
        return (
          <div className={styles.productionList}>
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : productionProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <p>제작 중인 프로젝트가 없습니다.</p>
              </div>
            ) : (
              productionProjects.map((project) => (
                <ProductionCard
                  key={project.id}
                  image={project.image}
                  brand={project.brand}
                  title={project.title}
                  progress={project.progress}
                  progressText={project.progress_text}
                  releaseDate={project.release_date}
                />
              ))
            )}
          </div>
        )
      case 'completed':
        return (
          <div className={styles.projectsGrid}>
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : completedProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <p>완료된 프로젝트가 없습니다.</p>
              </div>
            ) : (
              completedProjects.map((project) => (
                <CompletedCard
                  key={project.id}
                  image={project.image}
                  brand={project.brand}
                  title={project.title}
                  completedDate={project.completed_date}
                  price={project.price}
                />
              ))
            )}
          </div>
        )
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
            <span className={styles.statNumber}>{stats.completedProjects}</span>
            <span className={styles.statText}>개의 프로젝트가 완료되고</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statNumber}>{stats.totalVotes.toLocaleString()}</span>
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

export default UpcyclePage
