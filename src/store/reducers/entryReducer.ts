import { createSlice } from '@reduxjs/toolkit'
import {
  deleteEntry,
  fetchEntries,
  postNewEntry,
  updateEntry,
} from '../actions/entryActions'
import { Entry } from '@/models/Entry'
import { ErrorType, LoadingType } from '@/global/types'

interface TokenState {
  entries: Entry[]
  currentPage: number
  hasMore: boolean
  loading: LoadingType
  error: ErrorType
  createLoading: LoadingType
  createError: ErrorType
  deleteLoading: LoadingType
  deleteError: ErrorType
  updateLoading: LoadingType
  updateError: ErrorType
}

const initialState: TokenState = {
  entries: [] as Entry[],
  currentPage: 0,
  hasMore: true,
  loading: 'idle',
  error: undefined,
  createLoading: 'idle',
  createError: undefined,
  deleteLoading: 'idle',
  deleteError: undefined,
  updateLoading: 'idle',
  updateError: undefined,
}

const entrySlice = createSlice({
  name: 'entries',
  initialState: initialState,
  reducers: {
    getNextPage: (state) => {
      state.loading = 'idle'
      state.currentPage += 1
    },
    resetLoadings: (state) => {
      state.loading = 'idle'
      state.error = undefined
      state.createLoading = 'idle'
      state.createError = undefined
      state.deleteLoading = 'idle'
      state.deleteError = undefined
      state.updateLoading = 'idle'
      state.updateError = undefined
    },
    resetPage: (state) => {
      state.loading = 'idle'
      state.currentPage = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.hasMore = Boolean(action.payload.next)
        const isFirstPage = !Boolean(action.payload.previous)
        if (isFirstPage) {
          state.entries = action.payload.results
        } else {
          state.entries = [...state.entries, ...action.payload.results]
        }
        state.loading = 'succeeded'
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      .addCase(postNewEntry.pending, (state) => {
        state.createLoading = 'loading'
      })
      .addCase(postNewEntry.fulfilled, (state) => {
        state.createLoading = 'succeeded'
      })
      .addCase(postNewEntry.rejected, (state, action) => {
        state.createLoading = 'failed'
        state.createError = action.payload as string
      })
      .addCase(deleteEntry.pending, (state) => {
        state.deleteLoading = 'loading'
      })
      .addCase(deleteEntry.fulfilled, (state) => {
        state.deleteLoading = 'succeeded'
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.deleteLoading = 'failed'
        state.deleteError = action.payload as string
      })
      .addCase(updateEntry.pending, (state) => {
        state.updateLoading = 'loading'
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.updateLoading = 'succeeded'
        state.entries = state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return action.payload
          }
          return entry
        })
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.updateLoading = 'failed'
        state.updateError = action.payload as string
      })
  },
})

export const { resetLoadings, getNextPage, resetPage } = entrySlice.actions
export default entrySlice.reducer
