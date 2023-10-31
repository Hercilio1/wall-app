import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile } from '@/services/account'
import { User } from '@/models/User'

export const fetchProfile = createAsyncThunk<User>(
  'account/fetchProfile',
  async () => {
    return await getProfile()
  }
)
