'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button } from '@mui/material'
import { RootState, useAppDispatch } from '@/store/store'
import { Entry } from '@/models/Entry'
import CustomAlert from '@/components/common/CustomAlert'
import { updateEntry } from '@/store/actions/entryActions'
import { resetLoadings } from '@/store/reducers/entryReducer'
import EntryTextEditor from './EntryTextEditor'

export default function UpdateEntryForm({
  entry,
  cancelEdition,
}: {
  entry: Entry
  cancelEdition: () => void
}) {
  const [entryContent, setEntryContent] = useState<string>(entry.content ?? '')
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { updateLoading, updateError } = useSelector(
    (state: RootState) => state.entries
  )

  useEffect(() => {
    if (updateLoading === 'succeeded') {
      cancelEdition()
      dispatch(resetLoadings())
    }
    if (updateLoading === 'failed') {
      setOpenSnackbar(true)
    }
  }, [updateLoading, cancelEdition, dispatch])

  const handleSubmit = () => {
    dispatch(updateEntry({ id: entry.id, content: entryContent }))
  }

  return (
    <div className="flex flex-col items-end">
      <div className="w-full mb-2">
        <EntryTextEditor
          label="Editing..."
          value={entryContent}
          onChange={setEntryContent}
        />
      </div>
      <Box className="flex">
        <Button
          variant="outlined"
          onClick={cancelEdition}
          sx={{ marginRight: '12px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={updateLoading === 'loading'}
        >
          Write
        </Button>
      </Box>
      <CustomAlert
        message={updateError}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </div>
  )
}
