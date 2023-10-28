import { createAsyncThunk } from '@reduxjs/toolkit'
import { getEntries } from '@/services/entries'

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (page: number) => {
    return await getEntries(page)
  }
)
