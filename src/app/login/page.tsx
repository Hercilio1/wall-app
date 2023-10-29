'use client'

import { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '@/store/actions/authActions'
import { Alert } from '@mui/material'
import LoginGuard from '@/components/auth/LoginGuard'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (loading === 'succeeded') {
      redirect('/')
    }
  }, [loading])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(
      login({
        username: username as string,
        password: password as string,
      })
    )
  }

  return (
    <LoginGuard>
      <Container component="main" maxWidth="xs" className="h-full">
        <CssBaseline />
        <Box className="flex flex-col items-center justify-center h-full">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
              fullWidth
            />
            <TextField
              margin="normal"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === 'loading'}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            {loading === 'failed' && (
              <Alert sx={{ mt: 2 }} severity="error">
                {error}
              </Alert>
            )}
            <Grid container className="mt-2">
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LoginGuard>
  )
}
