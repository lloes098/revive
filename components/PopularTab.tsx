'use client'

import styles from './PopularTab.module.css'
import FeedPost from './FeedPost'

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
    <div className={styles.wrapper}>
      {/* 이번 주 TOP 3 섹션 */}
      <div className={styles.top3Container}>
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
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.49999 10C4.62202 10.0027 3.77512 9.67525 3.12725 9.08271C2.47938 8.49017 2.07787 7.67577 2.00236 6.80105C1.92684 5.92633 2.18283 5.05518 2.71956 4.36037C3.25629 3.66556 4.03455 3.19785 4.89999 3.05C7.74999 2.5 8.49999 2.24 9.49999 1C9.99999 2 10.5 3.09 10.5 5C10.5 7.75 8.10999 10 5.49999 10Z"
                      stroke="#849973"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 10.5C1 9 1.925 7.82 3.54 7.5C4.75 7.26 6 6.5 6.5 6"
                      stroke="#849973"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.statLabel}>탄소</span>
                  <span className={styles.statValue}>{member.carbon}</span>
                </div>
                <div className={styles.stat}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_33_2475)">
                      <path
                        d="M1 4.75002C1.00001 4.19362 1.1688 3.65031 1.48407 3.19185C1.79934 2.73339 2.24626 2.38135 2.7658 2.18222C3.28535 1.98309 3.85308 1.94624 4.39401 2.07654C4.93493 2.20684 5.42361 2.49816 5.7955 2.91202C5.82169 2.94003 5.85336 2.96236 5.88854 2.97762C5.92372 2.99289 5.96165 3.00076 6 3.00076C6.03835 3.00076 6.07628 2.99289 6.11146 2.97762C6.14664 2.96236 6.17831 2.94003 6.2045 2.91202C6.57522 2.49547 7.06401 2.2017 7.60582 2.06982C8.14762 1.93794 8.71675 1.97419 9.23744 2.17376C9.75813 2.37333 10.2057 2.72675 10.5206 3.18697C10.8354 3.6472 11.0027 4.1924 11 4.75002C11 5.89502 10.25 6.75002 9.5 7.50002L6.754 10.1565C6.66083 10.2635 6.54596 10.3495 6.41702 10.4087C6.28808 10.4679 6.14802 10.4989 6.00614 10.4998C5.86427 10.5007 5.72382 10.4714 5.59414 10.4139C5.46446 10.3563 5.34851 10.2718 5.254 10.166L2.5 7.50002C1.75 6.75002 1 5.90002 1 4.75002Z"
                        stroke="#C57B57"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_33_2475">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className={styles.statLabel}>좋아요</span>
                  <span className={styles.statValue}>{member.likes}</span>
                </div>
                <div className={styles.stat}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.7385 6.44501L8.496 10.708C8.50448 10.7582 8.49744 10.8098 8.47581 10.8559C8.45418 10.902 8.419 10.9404 8.37496 10.9659C8.33093 10.9915 8.28015 11.003 8.2294 10.9989C8.17866 10.9948 8.13037 10.9753 8.091 10.943L6.301 9.59951C6.21459 9.53495 6.10961 9.50007 6.00175 9.50007C5.89388 9.50007 5.78891 9.53495 5.7025 9.59951L3.9095 10.9425C3.87016 10.9747 3.82193 10.9942 3.77125 10.9983C3.72056 11.0024 3.66983 10.9909 3.62583 10.9654C3.58182 10.94 3.54664 10.9017 3.52496 10.8557C3.50328 10.8097 3.49614 10.7582 3.5045 10.708L4.2615 6.44501"
                      stroke="#8AA6A3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 7C7.65685 7 9 5.65685 9 4C9 2.34315 7.65685 1 6 1C4.34315 1 3 2.34315 3 4C3 5.65685 4.34315 7 6 7Z"
                      stroke="#8AA6A3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      <div className={styles.tagsContainer}>
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

      {/* 피드 포스트 섹션 */}
      <div className={styles.postsSection}>
        <FeedPost
          profileIcon="🕵️"
          username="아카이브헌터"
          timeAgo="2시간 전"
          content="드디어 찾았다! 1989년 쇼트 레더 재킷 😍"
          hashtags={[]}
          images={['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop']}
          likes={356}
          comments={52}
        />
        <FeedPost
          profileIcon="👑"
          username="레트로퀸"
          timeAgo="5시간 전"
          content="Y2K 코디 완성! 어떤가요? 🦋✨"
          hashtags={[]}
          images={['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop']}
          likes={287}
          comments={45}
        />
      </div>
    </div>
  )
}

