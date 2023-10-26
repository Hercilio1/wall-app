import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/Theme/ThemeRegistry'
import { Box } from '@mui/material'

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
        <ThemeRegistry options={{ key: 'mui' }}>
          <Box
            sx={{
              bgcolor: 'background.default',
            }}
            // className="chalk"
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
