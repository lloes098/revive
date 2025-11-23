'use client'

import styles from './FilterButtons.module.css'

interface FilterButton {
  emoji: string
  text: string
  id: string
}

interface FilterButtonsProps {
  buttons?: FilterButton[]
  selectedIds?: string[]
  onButtonClick?: (id: string) => void
}

const defaultButtons: FilterButton[] = [
  { emoji: '🌸', text: '보헤미안', id: 'bohemian' },
  { emoji: '✌️', text: '히피', id: 'hippie' },
  { emoji: '🛹', text: '스트릿', id: 'street' },
  { emoji: '📦', text: 'ALL', id: 'all' },
  { emoji: '🧥', text: '아우터', id: 'outer' },
  { emoji: '👕', text: '상의', id: 'tops' },
]

export default function FilterButtons({
  buttons = defaultButtons,
  selectedIds = [],
  onButtonClick,
}: FilterButtonsProps) {
  return (
    <div className={styles.container}>
      {buttons.map((button) => {
        const isSelected = selectedIds.includes(button.id)
        return (
          <button
            key={button.id}
            className={styles.button}
            onClick={() => onButtonClick?.(button.id)}
            style={{
              backgroundColor: isSelected ? '#F5F5F0' : 'white',
              borderColor: isSelected ? '#849973' : '#D4D3CE',
            }}
          >
            <div className={styles.buttonContent}>
              <span className={styles.emoji}>{button.emoji}</span>
              <span className={styles.text}>{button.text}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

