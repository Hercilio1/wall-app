'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MessageForm from '@/components/messages/MessageForm'
import MessagesList from '@/components/messages/MessagesList'

export default function Home() {
  return (
    <main>
      <Box className="py-8">
        <Container maxWidth="sm">
          <MessageForm />
        </Container>
        <Container className="pt-4" maxWidth="sm">
          <MessagesList />
        </Container>
      </Box>
    </main>
  )
}
