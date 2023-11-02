import { createAsyncThunk } from '@reduxjs/toolkit'
import { getEntries, postEntry } from '@/services/entries'

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (page: number, { rejectWithValue }) => {
    try {
      return await getEntries(page)
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)

export const postNewEntry = createAsyncThunk(
  'entries/postNewEntry',
  async (content: string, { dispatch, rejectWithValue }) => {
    try {
      await postEntry(content)
      dispatch(fetchEntries(1))
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)
