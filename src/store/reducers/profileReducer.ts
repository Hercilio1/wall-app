import { createSlice } from '@reduxjs/toolkit'
import { fetchProfile } from '../actions/profileActions'
import { User } from '@/models/User'
import { logout } from '../actions/logoutActions'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {} as User,
    loading: 'idle',
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
      .addCase(logout, (state) => {
        state.user = {} as User
      })
  },
})

export const {} = profileSlice.actions
export default profileSlice.reducer
