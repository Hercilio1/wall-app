'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchEntries } from '@/store/actions/entryActions'
import { RootState, useAppDispatch } from '@/store/store'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'

export default function MessagesList() {
  const dispatch = useAppDispatch()
  const { entries, loading, error, currentPage } = useSelector(
    (state: RootState) => state.entries
  )

  console.log('entries', entries)

  useEffect(() => {
    dispatch(fetchEntries(currentPage))
  }, [dispatch, currentPage])

  return (
    <Box className="flex flex-col">
      {entries.map((entry, index) => (
        <Card key={index} className="h-full flex flex-col my-3">
          <CardContent className="grow">
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>{entry.content}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
