'use client'

import { useState, useEffect } from 'react'
import styles from './CreateGroupModal.module.css'

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (groupData: { name: string; description: string; category: string }) => Promise<void>
}

export default function CreateGroupModal({
  isOpen,
  onClose,
  onCreate,
}: CreateGroupModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 폼 초기화
      setName('')
      setDescription('')
      setCategory('')
      setError(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('그룹 이름을 입력해주세요')
      return
    }

    if (!description.trim()) {
      setError('그룹 설명을 입력해주세요')
      return
    }

    if (!category) {
      setError('카테고리를 선택해주세요')
      return
    }

    setIsCreating(true)
    try {
      await onCreate({ name: name.trim(), description: description.trim(), category })
      onClose()
    } catch (err: any) {
      setError(err.message || '그룹 생성에 실패했습니다')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>새 그룹 만들기</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.content}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>그룹 이름 *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="예: 90s Denim Lovers"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>카테고리 *</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="denim">데님</option>
              <option value="y2k">Y2K</option>
              <option value="archive">아카이브</option>
              <option value="sportswear">스포츠웨어</option>
              <option value="leather">레더</option>
              <option value="streetwear">스트릿웨어</option>
              <option value="vintage">빈티지</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>그룹 설명 *</label>
            <textarea
              className={styles.textarea}
              placeholder="그룹에 대한 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
              required
            />
            <div className={styles.charCount}>
              {description.length}/500
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isCreating}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.createButton}
              disabled={isCreating}
            >
              {isCreating ? '생성 중...' : '그룹 만들기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

