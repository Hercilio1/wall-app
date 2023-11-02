'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { fetchEntries } from '@/store/actions/entryActions'
import { RootState, useAppDispatch } from '@/store/store'
import EntryCell from './EntryCell'
import ErrorAlert from '../common/ErrorAlert'
import { resetLoadings } from '@/store/reducers/entryReducer'

export default function EntriesList() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { entries, error, currentPage } = useSelector(
    (state: RootState) => state.entries
  )

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true)
    }
  }, [error])

  useEffect(() => {
    dispatch(resetLoadings())
    dispatch(fetchEntries(currentPage))
  }, [dispatch, currentPage])

  return (
    <>
      <Box className="flex flex-col">
        {entries.map((entry, index) => (
          <EntryCell key={index} entry={entry} />
        ))}
      </Box>
      <ErrorAlert
        message={error}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </>
  )
}
