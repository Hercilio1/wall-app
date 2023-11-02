import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getEntries,
  postEntry,
  deleteEntry as deleteEntryService,
  updateEntry as updateEntryService,
} from '@/services/entries'

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

export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await deleteEntryService(id)
      dispatch(fetchEntries(1))
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)

export const updateEntry = createAsyncThunk(
  'entries/updateEntry',
  async (
    { id, content }: { id: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateEntryService(id, content)
    } catch (error) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  }
)
