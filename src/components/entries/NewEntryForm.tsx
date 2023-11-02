'use client'

import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { postNewEntry } from '@/store/actions/entryActions'

export default function NewEntryForm() {
  const [entryContent, setEntryContent] = useState<string>('')

  const dispatch = useAppDispatch()
  const { loading, error } = useSelector((state: RootState) => state.entries)

  useEffect(() => {
    if (loading === 'succeeded') {
      setEntryContent('')
    }
  }, [loading])

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
        disabled={loading === 'loading'}
      >
        Write
      </Button>
    </div>
  )
}
