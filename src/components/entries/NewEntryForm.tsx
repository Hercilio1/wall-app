'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { RootState, useAppDispatch } from '@/store/store'
import { postNewEntry } from '@/store/actions/entryActions'
import ErrorAlert from '../common/ErrorAlert'

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

  const handleEntryContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntryContent(event.target.value)
  }

  const isAuthenticated = Boolean(user?.id)

  if (!isAuthenticated) {
    return <></>
  }

  return (
    <div className="flex flex-col items-end">
      <div className="w-full mb-2">
        <TextField
          label="What do you want to share?"
          multiline
          variant="outlined"
          rows="4"
          className="w-full"
          value={entryContent}
          onChange={handleEntryContentChange}
          sx={{
            '> div': {
              height: '125px',
            },
            '& textarea': {
              height: '92px',
            },
          }}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={createLoading === 'loading'}
      >
        Write
      </Button>
      <ErrorAlert
        message={createError}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </div>
  )
}
