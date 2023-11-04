'use client'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import LoginGuard from '@/components/auth/LoginGuard'
import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUp() {
  return (
    <LoginGuard>
      <Container component="main" maxWidth="xs" className="h-full">
        <CssBaseline />
        <SignUpForm />
      </Container>
    </LoginGuard>
  )
}
