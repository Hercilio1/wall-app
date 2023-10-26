'use client'

import { AppBar, Toolbar, Typography } from '@mui/material'
import { Button } from '@mui/material'

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: '32px',
        maxWidth: '96%',
        left: 0,
        right: 0,
        margin: '0 auto',
        backdropFilter: 'blur(1.5625rem)',
        // background: 'linear-gradient(180deg, rgba(45, 45, 45, 0.1) -5.96%, rgb(165 165 165 / 40%) 100%)',
        background:
          'linear-gradient(180deg, rgb(242 242 242 / 10%) -5.96%, rgb(236 236 236 / 40%) 100%)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color="text.primary"
          className="grow"
        >
          Wall App
        </Typography>
        <Button color="primary">Login</Button>
      </Toolbar>
    </AppBar>
  )
}
