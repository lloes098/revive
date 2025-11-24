'use client'

import { useEffect } from 'react'
import styles from './StoreDetailModal.module.css'

interface StoreDetailModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  distance: string
  rating: number
  status?: string
  tags: string[]
  hours: string
  completed: number
  awards: string[]
  phone?: string
  address?: string
  subwayInfo?: string
  description?: string
  isOpenNow?: boolean
}

export default function StoreDetailModal({
  isOpen,
  onClose,
  name,
  distance,
  rating,
  status,
  tags,
  hours,
  completed,
  awards,
  phone = '02-1234-5678',
  address = '서울 마포구 와우산로29길 12',
  subwayInfo = '2호선 홍대입구역 9번 출구에서 425m',
  description = '홍대 최초의 빈티지샵으로서 20년의 전통을 자랑합니다. 유럽과 미국에서 직접 공수한 정통 빈티지 의류와 액세서리들을 합리적인 가격으로 만나보실 수 있습니다.',
  isOpenNow = true,
}: StoreDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Navigation Bar */}
        <div className={styles.navBar}>
          <button className={styles.backButton} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#6B6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className={styles.navTitle}>빈티지샵</h2>
          <button className={styles.menuButton}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                fill="#6B6B6B"
              />
              <path
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                fill="#6B6B6B"
              />
              <path
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                fill="#6B6B6B"
              />
            </svg>
          </button>
        </div>

        {/* Store Header */}
        <div className={styles.storeHeader}>
          <div className={styles.storeNameRow}>
            <h1 className={styles.storeName}>{name}</h1>
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
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.actionIcon}
            >
              <path
                d="M11.5266 13.8067C11.6987 13.8857 11.8926 13.9038 12.0764 13.8579C12.2601 13.812 12.4227 13.7048 12.5375 13.5542L12.8333 13.1667C12.9885 12.9597 13.1898 12.7917 13.4213 12.6759C13.6527 12.5602 13.9079 12.5 14.1666 12.5H16.6666C17.1087 12.5 17.5326 12.6756 17.8451 12.9881C18.1577 13.3007 18.3333 13.7246 18.3333 14.1667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8451 17.8452C17.5326 18.1577 17.1087 18.3333 16.6666 18.3333C12.6884 18.3333 8.87307 16.753 6.06002 13.9399C3.24698 11.1269 1.66663 7.31157 1.66663 3.33332C1.66663 2.8913 1.84222 2.46737 2.15478 2.15481C2.46734 1.84225 2.89127 1.66666 3.33329 1.66666H5.83329C6.27532 1.66666 6.69924 1.84225 7.0118 2.15481C7.32436 2.46737 7.49996 2.8913 7.49996 3.33332V5.83332C7.49996 6.09206 7.43972 6.34725 7.324 6.57868C7.20829 6.8101 7.04029 7.01141 6.83329 7.16666L6.44329 7.45916C6.29031 7.57597 6.18248 7.74214 6.13812 7.92945C6.09376 8.11675 6.11561 8.31364 6.19996 8.48666C7.33886 10.7999 9.21198 12.6707 11.5266 13.8067Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.actionButtonText}>전화</span>
          </button>
          <button className={styles.actionButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.actionIcon}
            >
              <path
                d="M9.60416 1.91249C9.64068 1.83871 9.6971 1.7766 9.76704 1.73318C9.83698 1.68976 9.91767 1.66675 9.99999 1.66675C10.0823 1.66675 10.163 1.68976 10.233 1.73318C10.3029 1.7766 10.3593 1.83871 10.3958 1.91249L12.3208 5.81166C12.4476 6.0683 12.6348 6.29033 12.8663 6.4587C13.0979 6.62707 13.3668 6.73675 13.65 6.77833L17.955 7.40833C18.0366 7.42014 18.1132 7.45455 18.1762 7.50766C18.2393 7.56076 18.2862 7.63045 18.3117 7.70883C18.3372 7.78721 18.3402 7.87116 18.3205 7.95119C18.3007 8.03121 18.259 8.10412 18.2 8.16166L15.0867 11.1933C14.8813 11.3934 14.7277 11.6404 14.639 11.913C14.5503 12.1856 14.5292 12.4757 14.5775 12.7583L15.3125 17.0417C15.3269 17.1232 15.3181 17.2071 15.2871 17.2839C15.2561 17.3607 15.2041 17.4272 15.1371 17.4758C15.0701 17.5245 14.9908 17.5533 14.9082 17.5591C14.8256 17.5648 14.7431 17.5472 14.67 17.5083L10.8217 15.485C10.5681 15.3518 10.286 15.2823 9.99958 15.2823C9.71318 15.2823 9.43106 15.3518 9.17749 15.485L5.32999 17.5083C5.25694 17.547 5.17449 17.5644 5.09204 17.5585C5.00958 17.5527 4.93043 17.5238 4.86357 17.4752C4.79672 17.4266 4.74485 17.3601 4.71387 17.2835C4.68289 17.2069 4.67404 17.1231 4.68833 17.0417L5.42249 12.7592C5.47099 12.4764 5.44998 12.1862 5.36128 11.9134C5.27257 11.6406 5.11883 11.3935 4.91333 11.1933L1.79999 8.16249C1.74049 8.10502 1.69832 8.03199 1.6783 7.95172C1.65827 7.87145 1.66119 7.78717 1.68673 7.70848C1.71226 7.6298 1.75938 7.55986 1.82272 7.50665C1.88607 7.45343 1.96308 7.41907 2.04499 7.40749L6.34916 6.77833C6.63271 6.73708 6.90199 6.62754 7.13381 6.45915C7.36564 6.29076 7.55308 6.06855 7.67999 5.81166L9.60416 1.91249Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.actionButtonText}>저장</span>
          </button>
          <button className={styles.actionButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.actionIcon}
            >
              <path
                d="M16.6667 8.33332C16.6667 12.4942 12.0509 16.8275 10.5009 18.1658C10.3565 18.2744 10.1807 18.3331 10 18.3331C9.81938 18.3331 9.6436 18.2744 9.49921 18.1658C7.94921 16.8275 3.33337 12.4942 3.33337 8.33332C3.33337 6.56521 4.03575 4.86952 5.286 3.61928C6.53624 2.36904 8.23193 1.66666 10 1.66666C11.7682 1.66666 13.4638 2.36904 14.7141 3.61928C15.9643 4.86952 16.6667 6.56521 16.6667 8.33332Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10.8333C11.3807 10.8333 12.5 9.71406 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71406 8.61929 10.8333 10 10.8333Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.actionButtonText}>길찾기</span>
          </button>
          <button className={styles.actionButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.actionIcon}
            >
              <path
                d="M15 6.66666C16.3807 6.66666 17.5 5.54737 17.5 4.16666C17.5 2.78594 16.3807 1.66666 15 1.66666C13.6193 1.66666 12.5 2.78594 12.5 4.16666C12.5 5.54737 13.6193 6.66666 15 6.66666Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18.3333C16.3807 18.3333 17.5 17.2141 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.2141 13.6193 18.3333 15 18.3333Z"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.15833 11.2583L12.85 14.575"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.8417 5.42499L7.15833 8.74165"
                stroke="#3B3B3B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.actionButtonText}>공유</span>
          </button>
        </div>

        {/* Image Gallery */}
        <div className={styles.imageGallery}>
          <div className={styles.imagePlaceholder}>
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="#F5F5F0" />
              <path
                d="M50 50L150 50M50 100L150 100M50 150L150 150"
                stroke="#849973"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="30" fill="#849973" opacity="0.3" />
            </svg>
          </div>
          <div className={styles.imageDots}>
            <div className={styles.dotActive} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Tags */}
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Info */}
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

          {/* Awards */}
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

          {/* Basic Info Section */}
          <div className={styles.basicInfo}>
            {/* Location Info */}
            <div className={styles.locationSection}>
              <div className={styles.locationHeader}>
                <div className={styles.locationLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={styles.icon}
                  >
                    <path
                      d="M16.6667 8.33334C16.6667 12.4942 12.0509 16.8275 10.5009 18.1658C10.3565 18.2744 10.1807 18.3331 10 18.3331C9.81938 18.3331 9.6436 18.2744 9.49921 18.1658C7.94921 16.8275 3.33337 12.4942 3.33337 8.33334C3.33337 6.56523 4.03575 4.86954 5.286 3.61929C6.53624 2.36905 8.23193 1.66667 10 1.66667C11.7682 1.66667 13.4638 2.36905 14.7141 3.61929C15.9643 4.86954 16.6667 6.56523 16.6667 8.33334Z"
                      stroke="#6B6B6B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
                      stroke="#6B6B6B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.addressText}>{address}</span>
                </div>
                <div className={styles.locationRight}>
                  <span className={styles.mapLink}>지도</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#6B6B6B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.subwayInfo}>
                <span className={styles.subwayLine}>2호선</span>
                <span className={styles.subwayText}>{subwayInfo}</span>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Description */}
            <div className={styles.descriptionSection}>
              <p className={styles.description}>{description}</p>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Operating Hours */}
            <div className={styles.hoursSection}>
              <div className={styles.hoursHeader}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.icon}
                >
                  <g clipPath="url(#clip0_81_1673)">
                    <path
                      d="M10 5V10L13.3333 11.6667"
                      stroke="#6B6B6B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
                      stroke="#6B6B6B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_81_1673">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className={styles.hoursInfo}>
                  <span className={styles.openStatus}>
                    {isOpenNow ? '영업 중' : '영업 종료'} · {hours.split(' - ')[0]}에 영업 시작
                  </span>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#6B6B6B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.contactRow}>
              <div className={styles.phoneRow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.icon}
                >
                  <g clipPath="url(#clip0_81_1682)">
                    <path
                      d="M11.5266 13.8067C11.6987 13.8857 11.8926 13.9038 12.0764 13.8579C12.2601 13.812 12.4227 13.7049 12.5375 13.5542L12.8333 13.1667C12.9885 12.9597 13.1898 12.7917 13.4213 12.676C13.6527 12.5602 13.9079 12.5 14.1666 12.5H16.6666C17.1087 12.5 17.5326 12.6756 17.8451 12.9882C18.1577 13.3007 18.3333 13.7246 18.3333 14.1667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8451 17.8452C17.5326 18.1577 17.1087 18.3333 16.6666 18.3333C12.6884 18.3333 8.87307 16.753 6.06002 13.9399C3.24698 11.1269 1.66663 7.31158 1.66663 3.33333C1.66663 2.89131 1.84222 2.46738 2.15478 2.15482C2.46734 1.84226 2.89127 1.66667 3.33329 1.66667H5.83329C6.27532 1.66667 6.69924 1.84226 7.0118 2.15482C7.32436 2.46738 7.49996 2.89131 7.49996 3.33333V5.83333C7.49996 6.09207 7.43972 6.34726 7.324 6.57869C7.20829 6.81011 7.04029 7.01142 6.83329 7.16667L6.44329 7.45917C6.29031 7.57598 6.18248 7.74215 6.13812 7.92946C6.09376 8.11676 6.11561 8.31365 6.19996 8.48667C7.33886 10.7999 9.21198 12.6707 11.5266 13.8067Z"
                      stroke="#6B6B6B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_81_1682">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className={styles.phone}>{phone}</span>
              </div>
              <button className={styles.shareButton}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"
                    stroke="#6B6B6B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8C2 8.53043 2.21071 9.03914 2.58579 9.41421C2.96086 9.78929 3.46957 10 4 10C4.53043 10 5.03914 9.78929 5.41421 9.41421C5.78929 9.03914 6 8.53043 6 8C6 7.46957 5.78929 6.96086 5.41421 6.58579C5.03914 6.21071 4.53043 6 4 6Z"
                    stroke="#6B6B6B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4C10 4.53043 10.2107 5.03914 10.5858 5.41421C10.9609 5.78929 11.4696 6 12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2Z"
                    stroke="#6B6B6B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.6 7.2L10.4 4.8"
                    stroke="#6B6B6B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.6 8.8L10.4 11.2"
                    stroke="#6B6B6B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

