'use client'

import ThemeRegistry from '@/components/Theme/ThemeRegistry'
import { Box } from '@mui/material'
import { Provider } from 'react-redux'
import store from '@/store/store'
import Header from '@/components/common/Header'

export function PublicProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry options={{ key: 'mui' }}>
      <Box
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <Provider store={store}>
          <Header />
          <div className="py-24 h-screen">{children}</div>
        </Provider>
      </Box>
    </ThemeRegistry>
  )
}
