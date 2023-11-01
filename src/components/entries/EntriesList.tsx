'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { fetchEntries } from '@/store/actions/entryActions'
import { RootState, useAppDispatch } from '@/store/store'
import EntryCell from './EntryCell'

export default function EntriesList() {
  const dispatch = useAppDispatch()
  const { entries, loading, error, currentPage } = useSelector(
    (state: RootState) => state.entries
  )

  useEffect(() => {
    dispatch(fetchEntries(currentPage))
  }, [dispatch, currentPage])

  return (
    <Box className="flex flex-col">
      {entries.map((entry, index) => (
        <EntryCell key={index} entry={entry} />
      ))}
    </Box>
  )
}
