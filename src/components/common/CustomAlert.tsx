import { forwardRef } from 'react'
import { ErrorType } from '@/global/types'
import {
  Alert as MuiAlert,
  AlertProps,
  AlertColor,
  Snackbar,
} from '@mui/material'

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  }
)

export default function CustomAlert({
  message,
  openSnackbar,
  closeSnackbar,
  type,
}: {
  message: ErrorType
  openSnackbar: boolean
  closeSnackbar: () => void
  type: AlertColor
}) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={closeSnackbar}
    >
      <Alert severity={type} onClose={closeSnackbar}>
        {message}
      </Alert>
    </Snackbar>
  )
}
