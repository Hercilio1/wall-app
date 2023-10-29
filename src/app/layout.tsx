import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PublicProvider } from '@/components/providers/PublicProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wall App',
  description: 'Come on and write on our wall.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PublicProvider>{children}</PublicProvider>
      </body>
    </html>
  )
}
