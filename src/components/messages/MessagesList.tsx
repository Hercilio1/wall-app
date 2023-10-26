import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function MessagesList() {
  return (
    <Box className="flex flex-col">
      {cards.map((card) => (
        <Card key={card} className="h-full flex flex-col my-3">
          <CardContent className="grow">
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
