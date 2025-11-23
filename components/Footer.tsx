'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HomeIcon from './icons/HomeIcon'
import MapIcon from './icons/MapIcon'
import CommunityIcon from './icons/CommunityIcon'
import UpcycleIcon from './icons/UpcycleIcon'
import MyIcon from './icons/MyIcon'
import styles from './Footer.module.css'

const navItems = [
  { href: '/', label: '홈', icon: HomeIcon },
  { href: '/map', label: '지도', icon: MapIcon },
  { href: '/community', label: '커뮤니티', icon: CommunityIcon },
  { href: '/upcycle', label: '업사이클링', icon: UpcycleIcon },
  { href: '/my', label: '마이', icon: MyIcon },
]

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className={styles.footer}>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={styles.footerItem}
          >
            <Icon color={isActive ? '#849973' : '#6B6B6B'} />
            <span
              className={styles.footerLabel}
              style={{ color: isActive ? '#849973' : '#6B6B6B' }}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </footer>
  )
}

