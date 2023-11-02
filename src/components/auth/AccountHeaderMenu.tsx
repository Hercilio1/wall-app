'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { RootState, useAppDispatch } from '@/store/store'
import { fetchProfile } from '@/store/actions/profileActions'
import { logout } from '@/store/actions/logoutActions'

export default function AccountHeaderMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle color="primary" />
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
        onClose={handleClose}
        disableScrollLock={true}
      >
        <MenuItem disabled>{user.first_name || user.username}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
