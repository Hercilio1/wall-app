'use client'

import { useEffect } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '@/store/actions/authActions'

export default function Login() {
  const dispatch = useAppDispatch()
  const { entries, loading, error, currentPage } = useSelector(
    (state: RootState) => state.entries
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    dispatch(
      login({
        username: data.get('email') as string,
        password: data.get('password') as string,
      })
    )
  }

  return (
    <Container component="main" maxWidth="xs" className="h-full">
      <CssBaseline />
      <Box className="flex flex-col items-center justify-center h-full">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            name="email"
            value="admin"
            required
            fullWidth
            autoFocus
          />
          <TextField
            margin="normal"
            name="password"
            value="password123"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
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
  )
}
