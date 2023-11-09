'use client'

import { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { login } from '@/store/actions/authActions'
import { Alert } from '@mui/material'
import { turnOffJustSignedUp } from '@/store/reducers/authReducer'
import CustomAlert from '../common/CustomAlert'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const { loading, error, justSignedUp } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (loading === 'succeeded') {
      redirect('/')
    }
  }, [loading])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(
      login({
        email: email as string,
        password: password as string,
      })
    )
  }

  return (
    <Box className="flex flex-col items-center justify-center h-full">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          label="Email Address"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          fullWidth
        />
        <TextField
          margin="normal"
          label="Password"
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
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        {justSignedUp && (
          <CustomAlert
            message={
              'Registration successful! You can now log in with your new account.'
            }
            openSnackbar={justSignedUp}
            closeSnackbar={() => dispatch(turnOffJustSignedUp())}
            type="success"
          />
        )}
      </Box>
    </Box>
  )
}
