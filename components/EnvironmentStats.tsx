import styles from './EnvironmentStats.module.css'

interface EnvironmentStatsProps {
  vintageCount?: number
  upcycleCount?: number
  carbonReduction?: number
}

export default function EnvironmentStats({
  vintageCount = 1247,
  upcycleCount = 89,
  carbonReduction = 42.5,
}: EnvironmentStatsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <svg
          className={styles.leafIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33333 13.3333C6.16271 13.3369 5.0335 12.9003 4.16968 12.1103C3.30586 11.3202 2.77051 10.2343 2.66982 9.06805C2.56914 7.90176 2.91046 6.74022 3.6261 5.81381C4.34174 4.88739 5.37942 4.26378 6.53333 4.06665C10.3333 3.33331 11.3333 2.98665 12.6667 1.33331C13.3333 2.66665 14 4.11998 14 6.66665C14 10.3333 10.8133 13.3333 7.33333 13.3333Z"
            stroke="#849973"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.33333 14C1.33333 12 2.56667 10.4267 4.72 10C6.33333 9.68 8 8.66667 8.66667 8"
            stroke="#849973"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className={styles.title}>REVIVE 사용으로 인한 환경 절감 효과</h2>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} ${styles.vintage}`}>{vintageCount.toLocaleString()}건</p>
          <p className={styles.statLabel}>빈티지 의류 거래량</p>
        </div>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} ${styles.upcycle}`}>{upcycleCount}건</p>
          <p className={styles.statLabel}>업사이클링 매칭</p>
        </div>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} ${styles.carbon}`}>{carbonReduction}kg</p>
          <p className={styles.statLabel}>탄소 절감</p>
        </div>
      </div>
    </div>
  )
}

