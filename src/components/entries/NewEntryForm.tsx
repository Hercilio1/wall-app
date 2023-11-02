'use client'

import { useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Alert as MuiAlert, AlertProps, Snackbar } from '@mui/material'
import { RootState, useAppDispatch } from '@/store/store'
import { postNewEntry } from '@/store/actions/entryActions'

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  }
)

export default function NewEntryForm() {
  const [entryContent, setEntryContent] = useState<string>('')
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { createLoading, createError } = useSelector(
    (state: RootState) => state.entries
  )

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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          {createError}
        </Alert>
      </Snackbar>
    </div>
  )
}
