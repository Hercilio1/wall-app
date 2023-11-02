import { createAsyncThunk } from '@reduxjs/toolkit'
import { getEntries, postEntry } from '@/services/entries'

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async (page: number) => {
    return await getEntries(page)
  }
)

export const postNewEntry = createAsyncThunk(
  'entries/postNewEntry',
  async (content: string, { dispatch }) => {
    setTimeout(async () => {
      await postEntry(content)
      dispatch(fetchEntries(1))
    }, 2000)
  }
)
