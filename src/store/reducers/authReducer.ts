import { createSlice } from '@reduxjs/toolkit'
import { login, renewAccessToken } from '@/store/actions/authActions'

interface TokenState {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: TokenState = {
  accessToken: localStorage.getItem('access_token') || null,
  refreshToken: localStorage.getItem('refresh_token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
      })
      .addCase(renewAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
      })
  },
})

export const { setTokens, logout } = authSlice.actions

export default authSlice.reducer
