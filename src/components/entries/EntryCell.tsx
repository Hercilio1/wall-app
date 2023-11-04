'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Entry } from '@/models/Entry'
import { RootState, useAppDispatch } from '@/store/store'
import AccountCircle from '@mui/icons-material/AccountCircle'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { deleteEntry } from '@/store/actions/entryActions'
import CustomAlert from '../common/CustomAlert'
import UpdateEntryForm from './UpdateEntryForm'
import { resetLoadings } from '@/store/reducers/entryReducer'

export default function EntryCell({ entry }: { entry: Entry }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [openEntryEditor, setOpenEntryEditor] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { user } = useSelector((state: RootState) => state.profile)
  const { deleteLoading, deleteError } = useSelector(
    (state: RootState) => state.entries
  )

  const handleDeleteEntry = () => {
    dispatch(deleteEntry(entry.id))
  }

  useEffect(() => {
    if (deleteLoading === 'succeeded') {
      dispatch(resetLoadings())
    }
    if (deleteLoading === 'failed') {
      setOpenSnackbar(true)
    }
  }, [deleteLoading, dispatch])

  const isAuthenticated = user?.id === entry.user.id
  const accountCircleColor = user?.id === entry.user.id ? 'primary' : 'disabled'

  return (
    <Card className="h-full flex flex-col my-3">
      <CardHeader
        avatar={<AccountCircle fontSize="large" color={accountCircleColor} />}
        action={
          isAuthenticated && (
            <>
              <IconButton
                aria-label="settings"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  setAnchorEl(event.currentTarget)
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                disableScrollLock={true}
              >
                <MenuItem
                  onClick={() => {
                    setOpenEntryEditor(true)
                    setAnchorEl(null)
                  }}
                >
                  edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeleteEntry()
                    setAnchorEl(null)
                  }}
                >
                  delete
                </MenuItem>
              </Menu>
            </>
          )
        }
        title={entry.user.first_name || entry.user.email}
        subheader={new Date(entry.created_at).toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent className="grow">
        {openEntryEditor ? (
          <UpdateEntryForm
            entry={entry}
            cancelEdition={() => setOpenEntryEditor(false)}
          />
        ) : (
          <Box className="mt-2">
            <Typography>{entry.content}</Typography>
          </Box>
        )}
      </CardContent>
      <CustomAlert
        message={deleteError}
        openSnackbar={openSnackbar}
        closeSnackbar={() => setOpenSnackbar(false)}
        type="error"
      />
    </Card>
  )
}
