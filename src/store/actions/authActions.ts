import {
  refreshTokens,
  login as loginService,
  signUp as signUpService,
} from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginService(email, password)

      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)

      return response
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    {
      email,
      password,
      firstName,
      lastName,
    }: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signUpService(firstName, lastName, email, password)
      return response
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)

export const renewAccessToken = createAsyncThunk(
  'auth/renewAccessToken',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await refreshTokens(refreshToken)

      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)

      return response
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)
