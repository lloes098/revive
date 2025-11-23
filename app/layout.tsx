import type { Metadata } from 'next'
import { Paytone_One, Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const paytoneOne = Paytone_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-paytone-one',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Revive',
  description: 'A Next.js web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${paytoneOne.variable} ${inter.variable} layout-body`}>
        <main className="layout-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

