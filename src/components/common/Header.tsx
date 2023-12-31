'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Link as MuiLink,
} from '@mui/material'
import AccountHeaderMenu from '@/components/auth/AccountHeaderMenu'
import { RootState } from '@/store/store'
import Link from 'next/link'

export default function Header() {
  const { accessToken } = useSelector((state: RootState) => state.auth)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <Container maxWidth="lg">
      <AppBar
        position="fixed"
        sx={{
          top: {
            sm: 0,
            md: '32px',
          },
          width: 'inherit',
          maxWidth: 'inherit',
          left: 0,
          right: 0,
          margin: '0 auto',
          backdropFilter: 'blur(1.5625rem)',
          background:
            'linear-gradient(180deg, rgb(242 242 242 / 10%) -5.96%, rgb(236 236 236 / 40%) 100%)',
        }}
      >
        <Toolbar>
          <Link href="/" passHref className="grow">
            <Typography variant="h6" component="div" color="text.primary">
              Wall App
            </Typography>
          </Link>

          {domLoaded &&
            (accessToken ? (
              <AccountHeaderMenu />
            ) : (
              <Button color="primary" href="/login/" LinkComponent={MuiLink}>
                Login
              </Button>
            ))}
        </Toolbar>
      </AppBar>
    </Container>
  )
}
