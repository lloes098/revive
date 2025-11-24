'use client'

import styles from './StoreCard.module.css'

interface StoreCardProps {
  name: string
  distance: string
  rating: number
  status?: string
  tags: string[]
  hours: string
  completed: number
  awards: string[]
  onClick?: () => void
}

export default function StoreCard({
  name,
  distance,
  rating,
  status,
  tags,
  hours,
  completed,
  awards,
  onClick,
}: StoreCardProps) {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <div className={styles.indicator} />
          <h3 className={styles.name}>{name}</h3>
        </div>
        {status && (
          <div className={styles.statusTag}>
            {status}
          </div>
        )}
      </div>

      <div className={styles.distanceRating}>
        <span className={styles.distance}>{distance} </span>
        <div className={styles.rating}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
              fill="#FFC107"
            />
          </svg>
          <span>{rating}</span>
        </div>
      </div>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.info}>
        <div className={styles.hoursRow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M7.5 10.5V8C7.5 7.86739 7.44732 7.74021 7.35355 7.64645C7.25979 7.55268 7.13261 7.5 7 7.5H5C4.86739 7.5 4.74021 7.55268 4.64645 7.64645C4.55268 7.74021 4.5 7.86739 4.5 8V10.5"
              stroke="#6B6B6B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.88701 5.155C8.78277 5.05522 8.64405 4.99952 8.49976 4.99952C8.35546 4.99952 8.21674 5.05522 8.11251 5.155C7.88001 5.37676 7.57105 5.50048 7.24976 5.50048C6.92846 5.50048 6.6195 5.37676 6.38701 5.155C6.2828 5.05537 6.14418 4.99976 6.00001 4.99976C5.85583 4.99976 5.71721 5.05537 5.61301 5.155C5.38049 5.37691 5.07142 5.50072 4.75001 5.50072C4.42859 5.50072 4.11953 5.37691 3.88701 5.155C3.78277 5.05522 3.64405 4.99952 3.49976 4.99952C3.35546 4.99952 3.21674 5.05522 3.11251 5.155C2.88793 5.36931 2.59164 5.49238 2.28132 5.50027C1.971 5.50816 1.66884 5.40031 1.43366 5.19769C1.19848 4.99507 1.04711 4.7122 1.009 4.40412C0.970893 4.09605 1.04878 3.78481 1.22751 3.531L2.67201 1.439C2.76366 1.30376 2.88705 1.19303 3.0314 1.1165C3.17574 1.03997 3.33663 0.99997 3.50001 1H8.50001C8.6629 0.999938 8.82335 1.03967 8.96739 1.11574C9.11144 1.19182 9.23471 1.30193 9.32651 1.4365L10.774 3.5325C10.9528 3.78651 11.0306 4.09798 10.9922 4.40622C10.9539 4.71445 10.8021 4.99737 10.5666 5.19985C10.331 5.40232 10.0285 5.50984 9.71804 5.50145C9.40755 5.49307 9.11129 5.36939 8.88701 5.1545"
              stroke="#6B6B6B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 5.47501V9.50001C2 9.76522 2.10536 10.0196 2.29289 10.2071C2.48043 10.3946 2.73478 10.5 3 10.5H9C9.26522 10.5 9.51957 10.3946 9.70711 10.2071C9.89464 10.0196 10 9.76522 10 9.50001V5.47501"
              stroke="#6B6B6B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.hours}>{hours}</span>
        </div>
        <span className={styles.completed}>업사이클링 {completed}건 완료</span>
      </div>

      {awards.length > 0 && (
        <div className={styles.awards}>
          {awards.map((award, index) => (
            <div key={index} className={styles.award}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M9.02823 7.51917L9.91198 12.4927C9.92188 12.5512 9.91366 12.6114 9.88842 12.6652C9.86319 12.719 9.82214 12.7637 9.77077 12.7936C9.7194 12.8234 9.66015 12.8368 9.60095 12.832C9.54174 12.8272 9.48541 12.8045 9.43948 12.7668L7.35114 11.1994C7.25033 11.1241 7.12786 11.0834 7.00202 11.0834C6.87618 11.0834 6.75371 11.1241 6.65289 11.1994L4.56106 12.7663C4.51516 12.8038 4.4589 12.8265 4.39977 12.8313C4.34064 12.8361 4.28145 12.8227 4.23011 12.793C4.17878 12.7633 4.13772 12.7186 4.11243 12.665C4.08714 12.6113 4.07881 12.5512 4.08856 12.4927L4.97173 7.51917"
                  stroke="#C57B57"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 8.16666C8.933 8.16666 10.5 6.59966 10.5 4.66666C10.5 2.73367 8.933 1.16666 7 1.16666C5.067 1.16666 3.5 2.73367 3.5 4.66666C3.5 6.59966 5.067 8.16666 7 8.16666Z"
                  stroke="#C57B57"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{award}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


