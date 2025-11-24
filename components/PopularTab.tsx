'use client'

import styles from './PopularTab.module.css'

interface TopMember {
  rank: number
  medalColor: 'gold' | 'silver' | 'bronze'
  icon: string
  name: string
  title: string
  badge: string
  carbon: string
  likes: number
  votes: number
}

interface PopularTabProps {
  topMembers?: TopMember[]
  popularTags?: string[]
}

const defaultTopMembers: TopMember[] = [
  {
    rank: 1,
    medalColor: 'gold',
    icon: '🌱',
    name: '친환경패셔니스타',
    title: '친환경 챔피언',
    badge: '🏆',
    carbon: '52.3kg',
    likes: 847,
    votes: 28,
  },
  {
    rank: 2,
    medalColor: 'silver',
    icon: '🕵️',
    name: '아카이브헌터',
    title: '희귀템 컬렉터',
    badge: '🏆',
    carbon: '48.6kg',
    likes: 756,
    votes: 22,
  },
  {
    rank: 3,
    medalColor: 'bronze',
    icon: '👑',
    name: '레트로퀸',
    title: 'Y2K 전문가',
    badge: '🏆',
    carbon: '41.2kg',
    likes: 689,
    votes: 19,
  },
]

const defaultPopularTags = [
  '#90s데님',
  '#Y2K',
  '#레더재킷',
  '#지속가능패션',
  '#홍대빈티지',
  '#업사이클링',
  '#코디추천',
  '#희귀템',
]

export default function PopularTab({
  topMembers = defaultTopMembers,
  popularTags = defaultPopularTags,
}: PopularTabProps) {
  return (
    <div className={styles.container}>
      {/* 이번 주 TOP 3 섹션 */}
      <div className={styles.top3Section}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2L12.09 7.26L18 8.27L14 12.14L14.91 18.02L10 15.77L5.09 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z"
                fill="#CD7F32"
              />
            </svg>
            <h2 className={styles.sectionTitle}>이번 주 TOP 3</h2>
          </div>
          <p className={styles.sectionSubtitle}>가장 활발하게 활동한 커뮤니티 멤버들</p>
        </div>

        <div className={styles.membersList}>
          {topMembers.map((member) => (
            <div key={member.rank} className={styles.memberCard}>
              <div className={styles.memberHeader}>
                <div className={styles.rankMedal}>
                  <div 
                    className={`${styles.medal} ${
                      member.medalColor === 'gold' ? styles.gold :
                      member.medalColor === 'silver' ? styles.silver :
                      member.medalColor === 'bronze' ? styles.bronze : ''
                    }`}
                  >
                    <span className={styles.medalText}>W {member.rank}</span>
                  </div>
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberNameRow}>
                    <span className={styles.memberIcon}>{member.icon}</span>
                    <span className={styles.memberName}>{member.name}</span>
                  </div>
                  <div className={styles.memberTitleRow}>
                    <span className={styles.badgeIcon}>{member.badge}</span>
                    <span className={styles.memberTitle}>{member.title}</span>
                  </div>
                </div>
              </div>
              <div className={styles.memberStats}>
                <div className={styles.stat}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.33333L9.545 4.46333L13 4.96833L10.5 7.40333L11.09 10.8433L8 9.21833L4.91 10.8433L5.5 7.40333L3 4.96833L6.455 4.46333L8 1.33333Z"
                      fill="#849973"
                    />
                  </svg>
                  <span className={styles.statLabel}>탄소</span>
                  <span className={styles.statValue}>{member.carbon}</span>
                </div>
                <div className={styles.stat}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 13.3333C8.73638 13.3333 9.33333 12.7364 9.33333 12C9.33333 11.2636 8.73638 10.6667 8 10.6667C7.26362 10.6667 6.66667 11.2636 6.66667 12C6.66667 12.7364 7.26362 13.3333 8 13.3333Z"
                      fill="#FF6B6B"
                    />
                    <path
                      d="M8 2.66667C6.15905 2.66667 4.66667 4.15905 4.66667 6C4.66667 7.84095 6.15905 9.33333 8 9.33333C9.84095 9.33333 11.3333 7.84095 11.3333 6C11.3333 4.15905 9.84095 2.66667 8 2.66667Z"
                      fill="#FF6B6B"
                    />
                  </svg>
                  <span className={styles.statLabel}>♡좋아요</span>
                  <span className={styles.statValue}>{member.likes}</span>
                </div>
                <div className={styles.stat}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="#849973"
                    />
                    <path
                      d="M8 9.33333C6.15905 9.33333 4.66667 10.8257 4.66667 12.6667V15.3333H11.3333V12.6667C11.3333 10.8257 9.84095 9.33333 8 9.33333Z"
                      fill="#849973"
                    />
                  </svg>
                  <span className={styles.statLabel}>투표</span>
                  <span className={styles.statValue}>{member.votes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인기 태그 섹션 */}
      <div className={styles.tagsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5V15M5 10H15"
                stroke="#849973"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h2 className={styles.sectionTitle}>인기 태그</h2>
          </div>
        </div>
        <div className={styles.tagsGrid}>
          {popularTags.map((tag, index) => (
            <button key={index} className={styles.tag}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

