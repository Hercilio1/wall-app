import { createSlice } from '@reduxjs/toolkit'
import { fetchEntries, postNewEntry } from '../actions/entryActions'
import { Entry } from '@/models/Entry'

const entrySlice = createSlice({
  name: 'entries',
  initialState: {
    entries: [] as Entry[],
    loading: 'idle',
    error: undefined as string | undefined,
    currentPage: 1,
  },
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
        state.error = action.error.message
      })
      .addCase(postNewEntry.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(postNewEntry.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
  },
})

export const {} = entrySlice.actions
export default entrySlice.reducer
