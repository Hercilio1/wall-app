'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Alert } from '@mui/material'
import { RootState, useAppDispatch } from '@/store/store'
import { resetLoadings } from '@/store/reducers/authReducer'
import { signUp } from '@/store/actions/authActions'

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showRequiredErrors, setShowRequiredErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  })

  const dispatch = useAppDispatch()
  const { signUpLoading, signUpError } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (signUpLoading === 'succeeded') {
      redirect('/login')
    }
  }, [signUpLoading])

  useEffect(() => {
    return () => {
      dispatch(resetLoadings())
    }
  }, [dispatch])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setShowRequiredErrors({
        firstName: !firstName.trim(),
        lastName: !lastName.trim(),
        email: !email.trim(),
        password: !password.trim(),
      })
      return
    }

    dispatch(
      signUp({
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: password as string,
      })
    )
  }

  const handleRequiredError = (
    field: 'email' | 'password' | 'firstName' | 'lastName',
    customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const fields: {
      error: boolean
      helperText: string | boolean
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    } = {
      error: showRequiredErrors[field],
      helperText: showRequiredErrors[field] && `${field} is required`,
    }
    if (customOnChange) {
      fields.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        customOnChange(e)
        setShowRequiredErrors({
          ...showRequiredErrors,
          [field]: false,
        })
      }
    }
    return fields
  }

  return (
    <Box className="flex flex-col items-center justify-center h-full">
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              {...handleRequiredError('firstName', (e) =>
                setFirstName(e.target.value)
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="family-name"
              value={lastName}
              {...handleRequiredError('lastName', (e) =>
                setLastName(e.target.value)
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              value={email}
              {...handleRequiredError('email', (e) => setEmail(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              {...handleRequiredError('password', (e) =>
                setPassword(e.target.value)
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={signUpLoading === 'loading'}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        {signUpLoading === 'failed' && (
          <Alert sx={{ mt: 2, whiteSpace: 'pre-line' }} severity="error">
            {signUpError}
          </Alert>
        )}
        <Grid container className="mt-2" justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
