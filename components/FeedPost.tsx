'use client'

import styles from './FeedPost.module.css'

interface FeedPostProps {
  profileIcon: string
  username: string
  timeAgo: string
  content: string
  hashtags: string[]
  images: string[]
  likes: number
  comments: number
}

export default function FeedPost({
  profileIcon,
  username,
  timeAgo,
  content,
  hashtags,
  images,
  likes,
  comments,
}: FeedPostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.profileSection}>
          <div className={styles.profileIcon}>{profileIcon}</div>
          <div className={styles.userInfo}>
            <span className={styles.username}>{username}</span>
            <span className={styles.timeAgo}>{timeAgo}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.postContent}>
        <p className={styles.text}>{content}</p>
        {hashtags.length > 0 && (
          <div className={styles.hashtags}>
            {hashtags.map((tag, index) => (
              <span key={index} className={styles.hashtag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className={styles.imagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className={styles.postImage}
            />
          ))}
        </div>
      )}

      <div className={styles.postActions}>
        <button className={styles.actionButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33333 6.33332C1.33335 5.59145 1.55839 4.86704 1.97875 4.25576C2.39911 3.64448 2.99501 3.17509 3.68774 2.90959C4.38047 2.64408 5.13744 2.59495 5.85867 2.76868C6.57991 2.94242 7.23148 3.33084 7.72733 3.88265C7.76226 3.92 7.80448 3.94977 7.85138 3.97012C7.89829 3.99047 7.94887 4.00098 8 4.00098C8.05113 4.00098 8.10171 3.99047 8.14861 3.97012C8.19552 3.94977 8.23774 3.92 8.27267 3.88265C8.76696 3.32725 9.41868 2.93556 10.1411 2.75972C10.8635 2.58388 11.6223 2.63222 12.3166 2.89831C13.0108 3.1644 13.6076 3.63562 14.0274 4.24925C14.4472 4.86289 14.6702 5.58983 14.6667 6.33332C14.6667 7.85999 13.6667 8.99999 12.6667 9.99999L9.00533 13.542C8.88111 13.6847 8.72795 13.7993 8.55603 13.8782C8.38411 13.9571 8.19736 13.9986 8.00819 13.9997C7.81902 14.0009 7.63176 13.9619 7.45886 13.8851C7.28595 13.8084 7.13135 13.6957 7.00533 13.5547L3.33333 9.99999C2.33333 8.99999 1.33333 7.86665 1.33333 6.33332Z"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.actionCount}>{likes}</span>
        </button>
        <button className={styles.actionButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_32_1784)">
              <path
                d="M1.99466 10.8946C2.09269 11.1419 2.11451 11.4128 2.05733 11.6726L1.34733 13.866C1.32445 13.9772 1.33037 14.0924 1.36451 14.2007C1.39866 14.309 1.4599 14.4068 1.54244 14.4848C1.62498 14.5628 1.72607 14.6184 1.83613 14.6464C1.94619 14.6744 2.06157 14.6738 2.17133 14.6446L4.44666 13.9793C4.69181 13.9307 4.94568 13.9519 5.17933 14.0406C6.60292 14.7054 8.21557 14.8461 9.73276 14.4378C11.25 14.0295 12.5742 13.0984 13.4718 11.8089C14.3694 10.5193 14.7827 8.95423 14.6389 7.38966C14.495 5.82509 13.8031 4.3616 12.6854 3.25742C11.5676 2.15324 10.0958 1.47932 8.52958 1.35456C6.96337 1.2298 5.40342 1.66221 4.12496 2.57552C2.84649 3.48882 1.93168 4.82432 1.54192 6.34638C1.15217 7.86845 1.31251 9.47926 1.99466 10.8946Z"
                stroke="#6B6B6B"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_32_1784">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className={styles.actionCount}>{comments}</span>
        </button>
        <button className={styles.actionButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5.33337C13.1046 5.33337 14 4.43794 14 3.33337C14 2.2288 13.1046 1.33337 12 1.33337C10.8954 1.33337 10 2.2288 10 3.33337C10 4.43794 10.8954 5.33337 12 5.33337Z"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14.6666C13.1046 14.6666 14 13.7712 14 12.6666C14 11.5621 13.1046 10.6666 12 10.6666C10.8954 10.6666 10 11.5621 10 12.6666C10 13.7712 10.8954 14.6666 12 14.6666Z"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.72667 9.00671L10.28 11.66"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.2733 4.33997L5.72667 6.9933"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className={styles.actionButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 14L7.99999 11.3333L3.33333 14V3.33333C3.33333 2.97971 3.4738 2.64057 3.72385 2.39052C3.9739 2.14048 4.31304 2 4.66666 2H11.3333C11.6869 2 12.0261 2.14048 12.2761 2.39052C12.5262 2.64057 12.6667 2.97971 12.6667 3.33333V14Z"
              stroke="#6B6B6B"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}


