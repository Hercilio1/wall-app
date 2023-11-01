'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function NewEntryForm() {
  const [tweetText, setTweetText] = React.useState<string>('')

  const handleTweetTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTweetText(event.target.value)
  }

  const handleSubmitTweet = () => {
    // Implemente a lógica de envio do tweet aqui
    console.log('Texto do tweet:', tweetText)
    setTweetText('')
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
          value={tweetText}
          onChange={handleTweetTextChange}
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
      <Button variant="contained" onClick={handleSubmitTweet}>
        Write
      </Button>
    </div>
  )
}
