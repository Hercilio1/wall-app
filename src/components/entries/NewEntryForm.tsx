'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import { RootState, useAppDispatch } from '@/store/store'
import { postNewEntry } from '@/store/actions/entryActions'
import CustomAlert from '../common/CustomAlert'
import EntryTextEditor from './EntryTextEditor'

export default function NewEntryForm() {
  const [entryContent, setEntryContent] = useState<string>('')
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { createLoading, createError } = useSelector(
    (state: RootState) => state.entries
  )
  const { user } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    if (createLoading === 'succeeded') {
      setEntryContent('')
    }
    if (createLoading === 'failed') {
      setOpenSnackbar(true)
    }
  }, [createLoading])

  const handleSubmit = () => {
    dispatch(postNewEntry(entryContent))
  }

  const isAuthenticated = Boolean(user?.id)

  if (!isAuthenticated) {
    return <></>
  }

  return (
    <div className="flex flex-col items-end">
      <div className="w-full mb-2">
        <EntryTextEditor
          label="What do you want to share?"
          value={entryContent}
          onChange={setEntryContent}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={createLoading === 'loading'}
      >
        Write
      </Button>
      <CustomAlert
        message={createError}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </div>
  )
}
