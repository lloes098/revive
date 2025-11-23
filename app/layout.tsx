import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

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
      <body className="layout-body">
        <main className="layout-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

