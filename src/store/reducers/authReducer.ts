import { createSlice } from '@reduxjs/toolkit'
import { login, renewAccessToken } from '@/store/actions/authActions'
import { ErrorType, LoadingType } from '@/global/types'
import { logout } from '../actions/logoutActions'

interface TokenState {
  accessToken: string | null
  refreshToken: string | null
  loading: LoadingType
  error: ErrorType
}

const initialState: TokenState = {
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  refreshToken:
    typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null,
  loading: 'idle',
  error: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      .addCase(renewAccessToken.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(renewAccessToken.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
      })
      .addCase(renewAccessToken.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      .addCase(logout, (state) => {
        state.accessToken = null
        state.refreshToken = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
  },
})

export const { setTokens } = authSlice.actions

export default authSlice.reducer
