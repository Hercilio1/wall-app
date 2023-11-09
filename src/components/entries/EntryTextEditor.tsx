import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function EntryTextEditor({ label, value, onChange }: Props) {
  const maxLength = 280

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (newText.length <= maxLength) {
      onChange(newText)
    }
  }

  return (
    <>
      <TextField
        label={label}
        multiline
        variant="outlined"
        rows="4"
        className="w-full"
        value={value}
        onChange={handleTextChange}
        sx={{
          '> div': {
            height: '125px',
          },
          '& textarea': {
            height: '92px',
          },
        }}
      />
      <div className="absolute mt-2 font-light text-sm">
        {value.length}/{maxLength}
      </div>
    </>
  )
}
