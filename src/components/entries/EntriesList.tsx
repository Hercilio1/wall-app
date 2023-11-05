'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { fetchEntries } from '@/store/actions/entryActions'
import { RootState, useAppDispatch } from '@/store/store'
import { resetLoadings, getNextPage } from '@/store/reducers/entryReducer'
import EntryCell from './EntryCell'
import CustomAlert from '../common/CustomAlert'

export default function EntriesList() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { entries, loading, error, currentPage, hasMore } = useSelector(
    (state: RootState) => state.entries
  )

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (container) {
      if (
        loading === 'idle' &&
        hasMore &&
        window.scrollY + window.innerHeight >= container.scrollHeight - 200
      ) {
        dispatch(getNextPage())
      }
    }
  }, [dispatch, loading, hasMore])

  useEffect(() => {
    dispatch(resetLoadings())
    dispatch(fetchEntries(currentPage))
  }, [dispatch, currentPage])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true)
    }
  }, [error])

  return (
    <>
      <Box className="flex flex-col" ref={containerRef}>
        {entries.map((entry, index) => (
          <EntryCell key={index} entry={entry} />
        ))}
      </Box>
      {hasMore && <p>Loading more...</p>}
      <CustomAlert
        message={error}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </>
  )
}
