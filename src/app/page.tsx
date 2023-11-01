'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import NewEntryForm from '@/components/entries/NewEntryForm'
import EntriesList from '@/components/entries/EntriesList'

export default function Home() {
  return (
    <main>
      <Box className="py-8">
        <Container maxWidth="sm">
          <NewEntryForm />
        </Container>
        <Container className="pt-4" maxWidth="sm">
          <EntriesList />
        </Container>
      </Box>
    </main>
  )
}
