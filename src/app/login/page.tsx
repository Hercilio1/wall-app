'use client'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import LoginGuard from '@/components/auth/LoginGuard'
import LoginForm from '@/components/auth/LoginForm'

export default function Login() {
  return (
    <LoginGuard>
      <Container component="main" maxWidth="xs" className="h-full">
        <CssBaseline />
        <LoginForm />
      </Container>
    </LoginGuard>
  )
}
