import { refreshTokens, login as loginService } from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginService(username, password)

      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)

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
