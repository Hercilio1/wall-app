import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile } from '@/services/account'
import { User } from '@/models/User'

interface RootState {
  auth: {
    accessToken: string | null
  }
}

export const fetchProfile = createAsyncThunk<User, void, { state: RootState }>(
  'account/fetchProfile',
  async (_, { getState }) => {
    const { accessToken } = getState().auth
    return await getProfile(accessToken)
  }
)
