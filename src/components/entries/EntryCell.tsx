import { Entry } from '@/models/Entry'
import { RootState } from '@/store/store'
import AccountCircle from '@mui/icons-material/AccountCircle'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'

export default function EntryCell({ entry }: { entry: Entry }) {
  const { user } = useSelector((state: RootState) => state.profile)

  const accountCircleColor = user?.id === entry.user.id ? 'primary' : 'disabled'

  return (
    <Card className="h-full flex flex-col my-3">
      <CardContent className="grow">
        <Box className="flex">
          <AccountCircle color={accountCircleColor} className="mr-2" />
          <Typography gutterBottom>
            {entry.user.first_name || entry.user.username}
          </Typography>
        </Box>
        <Box className="mt-2">
          <Typography>{entry.content}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  )
}
