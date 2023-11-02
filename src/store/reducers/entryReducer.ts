import { createSlice } from '@reduxjs/toolkit'
import { fetchEntries, postNewEntry } from '../actions/entryActions'
import { Entry } from '@/models/Entry'

interface TokenState {
  entries: Entry[]
  currentPage: number
  loading: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
  createLoading: 'idle' | 'loading' | 'succeeded' | 'failed'
  createError: string | undefined
}

const initialState: TokenState = {
  entries: [] as Entry[],
  currentPage: 1,
  loading: 'idle',
  error: undefined as string | undefined,
  createLoading: 'idle',
  createError: undefined as string | undefined,
}

const entrySlice = createSlice({
  name: 'entries',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entries = action.payload
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      .addCase(postNewEntry.pending, (state) => {
        state.createLoading = 'loading'
      })
      .addCase(postNewEntry.rejected, (state, action) => {
        state.createLoading = 'failed'
        state.createError = action.payload as string
      })
  },
})

export const {} = entrySlice.actions
export default entrySlice.reducer
