'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function ResaleApplyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    images: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 호출
    console.log('Form submitted:', formData)
    // 제출 후 처리
    router.push('/my')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.title}>리셀 판매 신청</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* 폼 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 상품 이미지 */}
        <div className={styles.section}>
          <label className={styles.label}>상품 이미지</label>
          <div className={styles.imageUploadArea}>
            <div className={styles.imagePlaceholder}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L22 16M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                  stroke="#999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>이미지 추가</span>
            </div>
          </div>
        </div>

        {/* 상품명 */}
        <div className={styles.section}>
          <label className={styles.label}>상품명 *</label>
          <input
            type="text"
            className={styles.input}
            placeholder="상품명을 입력해주세요"
            value={formData.productName}
            onChange={(e) => handleInputChange('productName', e.target.value)}
            required
          />
        </div>

        {/* 브랜드 */}
        <div className={styles.section}>
          <label className={styles.label}>브랜드 *</label>
          <input
            type="text"
            className={styles.input}
            placeholder="브랜드명을 입력해주세요"
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            required
          />
        </div>

        {/* 카테고리 */}
        <div className={styles.section}>
          <label className={styles.label}>카테고리 *</label>
          <select
            className={styles.select}
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
          >
            <option value="">카테고리를 선택해주세요</option>
            <option value="outer">아우터</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
            <option value="shoes">신발</option>
            <option value="bag">가방</option>
            <option value="accessory">액세서리</option>
          </select>
        </div>

        {/* 상태 */}
        <div className={styles.section}>
          <label className={styles.label}>상품 상태 *</label>
          <select
            className={styles.select}
            value={formData.condition}
            onChange={(e) => handleInputChange('condition', e.target.value)}
            required
          >
            <option value="">상태를 선택해주세요</option>
            <option value="new">새상품</option>
            <option value="like_new">거의 새것</option>
            <option value="good">양호</option>
            <option value="fair">보통</option>
          </select>
        </div>

        {/* 판매가 */}
        <div className={styles.section}>
          <label className={styles.label}>희망 판매가 *</label>
          <div className={styles.priceInputWrapper}>
            <input
              type="number"
              className={styles.input}
              placeholder="0"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
            />
            <span className={styles.priceUnit}>원</span>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className={styles.section}>
          <label className={styles.label}>상품 설명</label>
          <textarea
            className={styles.textarea}
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            rows={6}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        {/* 제출 버튼 */}
        <div className={styles.submitSection}>
          <button type="submit" className={styles.submitButton}>
            신청하기
          </button>
        </div>
      </form>
    </div>
  )
}

